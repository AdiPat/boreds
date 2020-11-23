/**
 *
 * @function rejectInvite
 * Rejects invite by deleting the invite reference.
 *
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.func = functions.https.onCall((data, context) => {
  const invite = data;
  const inviteId = invite.id;
  const receiverEmail = invite.to;
  const userEmail = context.auth.token.email;
  const database = admin.database();
  const inviteRef = database.ref(`invites/${inviteId}`);

  if (typeof inviteId !== "string") {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "acceptInvite: inviteId should be a string."
    );
  }

  if (receiverEmail !== userEmail) {
    throw new functions.https.HttpsError(
      "permission-denied",
      "rejectInvite: User does not have access to this invite."
    );
  }

  return inviteRef
    .remove()
    .then(() => {
      console.log(`Successfully deleted invite: ${inviteId}`);
      return true;
    })
    .catch((err) => {
      if (err) {
        console.log(`Failed to delete invite: ${inviteId}. `, err);
      }
      return false;
    });
});
