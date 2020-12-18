const functions = require("firebase-functions");
const admin = require("firebase-admin");
const utils = require("../utils/utils");

exports.func = functions.https.onCall(async (data, context) => {
  const store = admin.firestore();
  const eventId = data.eventId;

  utils.assertUserAuth(context);

  utils.assertTypeCheck("eventId", "string", eventId);

  const userId = context.auth.token.uid;

  let status = false;

  const docRef = store
    .collection("calendarEvents")
    .doc(userId)
    .collection("events")
    .doc(eventId);

  await docRef
    .delete()
    .then(() => {
      console.log(`Successfully deleted event[${eventId}]. `);
      status = true;
    })
    .catch((err) => {
      const errMsg = `Failed to delete event.`;
      status = false;
      console.error(errMsg, err);
      throw new functions.https.HttpsError("internal", errMsg, errMsg);
    });

  return {
    status,
  };
});
