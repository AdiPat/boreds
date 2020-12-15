const functions = require("firebase-functions");
const admin = require("firebase-admin");
const utils = require("../utils/utils");
const calendarUtils = require("../utils/calendar-utils");

exports.func = functions.https.onCall(async (data, context) => {
  const store = admin.firestore();
  const _calendarEvent = data;

  // auth check
  utils.assertUserAuth(context);
  // validate data
  calendarUtils.validateCalendarEvent(_calendarEvent);
  const calendarEvent = calendarUtils.mapCalendarEventFields(_calendarEvent);

  const userId = context.auth.token.uid;
  const calendarRef = store
    .collection("calendarEvents")
    .doc(userId)
    .collection("events");

  let status = false;
  try {
    const res = await calendarRef.add(calendarEvent);
    console.log(`Successfully added event: [${res.id}]`);
    status = true;
  } catch (err) {
    const calendarEventStr = JSON.stringify(calendarEvent);
    let errMsg = `addEvent(): Failed to add calendar event: ${calendarEventStr}`;
    if (err) {
      console.error(errMsg, err);
      throw new functions.https.HttpsError("internal", errMsg);
    }
  }

  return {
    status,
  };
});
