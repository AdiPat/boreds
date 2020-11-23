/**
 *
 * @function createInvite
 * Creates invite when requested from client side.
 * Receiver gets a notification.
 *
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.func = functions.https.onCall(async (data, context) => {
  const database = admin.database();
  const fromEmail = data.fromEmail;
  const toEmail = data.toEmail;
  const boardId = data.boardId;
  const boardRef = database.ref(`boards/${boardId}`);
  const invitesRef = database.ref("invites/");

  if (
    typeof fromEmail != "string" ||
    typeof toEmail != "string" ||
    typeof boardId != "string"
  ) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `The function must be called with arguments toEmail (string), toEmail (string) and boardId (string).`
    );
  }

  if (fromEmail === toEmail) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `fromEmail [${fromEmail}] and toEmail [${toEmail}] cannot be the same.`
    );
  }

  // the user who the invite is being sent to must not already be in the list of board users
  const boardData = (await boardRef.once("value")).val();
  if (!boardData) {
    throw new functions.https.HttpsError(
      "not-found",
      `Board with ${boardId} not found.`
    );
  } else {
    const permissions = boardData.permissions;
    const readPermissions = permissions ? permissions.read : null;
    const writePermissions = permissions ? permissions.write : null;
    let foundUserRead = false;
    let foundUserWrite = false;

    if (readPermissions) {
      foundUserRead =
        Object.keys(readPermissions).filter(
          (readKey) => readPermissions[readKey] == toEmail
        ).length > 0;
    }

    if (writePermissions) {
      foundUserWrite =
        Object.keys(writePermissions).filter(
          (writeKey) => writePermissions[writeKey] == toEmail
        ).length > 0;
    }

    if (foundUserRead || foundUserWrite) {
      throw new functions.https.HttpsError(
        "already-exists",
        `User already has access to the board.`
      );
    }
  }

  return invitesRef
    .push({
      from: fromEmail,
      to: toEmail,
      boardId: boardId,
    })
    .then(() => {
      return true;
    })
    .catch((err) => {
      if (err) {
        console.log("Failed to create invite: ", err);
      }
      return false;
    });
});
