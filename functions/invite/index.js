const functions = require("firebase-functions");
const admin = require("firebase-admin");

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
