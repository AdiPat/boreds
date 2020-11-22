const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.createInvite = functions.https.onCall(async (data, context) => {
  const fromEmail = data.fromEmail;
  const toEmail = data.toEmail;
  const boardId = data.boardId;

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

  const database = admin.database();
  const invitesRef = database.ref("invites/");
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

exports.checkDuplicateInvite = functions.https.onCall(async (data, context) => {
  const fromEmail = context.auth.token.email;
  const toEmail = data.toEmail;
  const boardId = data.boardId;
  const userId = context.auth.uid;

  if (typeof fromEmail != "string" || typeof boardId != "string") {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `The function must be called with arguments toEmail (string) and boardId (string).`
    );
  }
  if (userId == null) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      `The userId is invalid.`
    );
  }
  const database = admin.database();
  const invitesRef = database.ref("invites/");
  const queryStr = `${fromEmail}_${toEmail}_${boardId}`;
  let foundDuplicates = null;
  try {
    const duplicatesSnapshot = await invitesRef
      .orderByChild("from_to_boardId")
      .equalTo(queryStr)
      .once("value");
    foundDuplicates = duplicatesSnapshot.exists();
  } catch (err) {
    console.error(
      `Failed to get duplicate invites from fromEmail = ${fromEmail}, toEmail = ${toEmail} and boardId = ${boardId}. `,
      err
    );
  }
  return {
    foundDuplicates,
  };
});

exports.inviteCreateTrigger = functions.database
  .ref("invites/{inviteId}")
  .onCreate((snapshot, context) => {
    const invite = snapshot.val();
    const inviteId = context.params.inviteId;
    const now = new Date();
    if (
      snapshot.hasChild("from") &&
      snapshot.hasChild("to") &&
      snapshot.hasChild("boardId")
    ) {
      const queryStr = `${invite.from}_${invite.to}_${invite.boardId}`;
      return snapshot.ref
        .update({
          id: inviteId,
          createdAt: now.toString(),
          from_to_boardId: queryStr,
        })
        .then(() => {
          console.log(`Successfully added invite meta data to ${inviteId}`);
          return true;
        })
        .catch((err) => {
          if (err) {
            console.error(`Failed to add meta data to ${invite.id}. `, err);
            return snapshot.ref.remove();
          }
        });
    } else {
      console.log(
        `Invite [${invite.id}] does not have from, to and boardId as children. Deleting.`
      );
      return snapshot.ref.remove();
    }
  });

exports.getAllReceivedInvites = functions.https.onCall(
  async (data, context) => {
    const userId = context.auth.uid;
    const toEmail = context.auth.token.email;
    const database = admin.database();
    const invitesRef = database.ref("invites/");
    let invites = null;
    if (userId == null) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        `Need authentication to call this function.`
      );
    }

    try {
      const invitesSnapshot = await invitesRef
        .orderByChild("to")
        .equalTo(toEmail)
        .once("value");
      invites = await invitesSnapshot.val();
    } catch (err) {
      if (err) {
        throw new functions.https.HttpsError(
          "internal",
          `Failed to get invites for userId=${userId}`
        );
      }
    }
    return {
      invites,
    };
  }
);
