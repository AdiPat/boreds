/**
 *
 * @function getAllReceivedInvites
 * Gets all invites received by the user.
 *
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.func = functions.https.onCall(async (data, context) => {
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
});
