/**
 *
 * @function acceptInvite
 * Accepts invite. Does 4 things.
 * 1. Updates board read permissions.
 * 2. Updates board write permissions.
 * 3. Updates invite receiver's board reference.
 * 4. Deletes invite.
 *
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.func = functions.https.onCall(async (data, context) => {
  const database = admin.database();
  const invite = data;
  const inviteId = invite.id;
  const userEmail = context.auth.token.email;
  const fromEmail = invite.from;
  const boardId = invite.boardId;
  const receiverUserId = context.auth.token.uid;

  if (typeof inviteId != "string") {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "acceptInvite: inviteId should be a string."
    );
  }

  if (invite.from == invite.to) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `acceptInvite: fromEmail[${fromEmail}] and toEmail[${toEmail}] can't be the same. `
    );
  }

  const inviteRef = database.ref(`invites/${inviteId}`);
  let acceptSuccess = false;

  const addEmailToBoardPermissions = async (
    inviteBoardRef,
    email,
    permType
  ) => {
    return inviteBoardRef
      .child("permissions")
      .child(permType)
      .once("value", function (usersSnapshot) {
        const users = usersSnapshot.val();
        let foundUser = false;
        Object.keys(users).forEach((key) => {
          foundUser = users[key] == email;
        });
        if (!foundUser) {
          usersSnapshot.ref.push(email);
        }
      });
  };

  try {
    console.log("fromEmail: ", fromEmail);
    const boardRef = database.ref(`boards/${boardId}`);
    const inviteReceiverBoardsRef = database.ref(
      `users/${receiverUserId}/boards/${boardId}`
    );

    if (invite.to != userEmail) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "User doesn't have access to this invite"
      );
    }

    // update board read permissions
    const promiseAddEmail1 = addEmailToBoardPermissions(
      boardRef,
      userEmail,
      "read"
    );

    // update board write permissions
    const promiseAddEmail2 = addEmailToBoardPermissions(
      boardRef,
      userEmail,
      "write"
    );

    // add board to receivers boards
    const promiseReceiveInvite = inviteReceiverBoardsRef
      .set({ id: boardId })
      .then(() => {
        console.log(
          `Successfully added board to ${inviteReceiverBoardsRef.toString()}`
        );
      })
      .catch((err) => {
        if (err) {
          throw new functions.https.HttpsError(
            "internal",
            "Board update to users/ failed."
          );
        }
      });

    // delete invite
    const promiseRemoveInvite = inviteRef.remove((err) => {
      if (err) {
        console.log(`Failed to delete invite. `, err);
      }
    });

    await Promise.all([
      promiseAddEmail1,
      promiseAddEmail2,
      promiseReceiveInvite,
      promiseRemoveInvite,
    ]).then((result) => {
      acceptSuccess = true;
    });
  } catch (err) {
    console.error(`Failed to accept invite. `, err);
    acceptSuccess = false;
  }
  return acceptSuccess;
});
