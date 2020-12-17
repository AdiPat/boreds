const functions = require("firebase-functions");
const admin = require("firebase-admin");
const utils = require("../utils/utils");
const calendarUtils = require("../utils/calendar-utils");

exports.func = functions.https.onCall(async (data, context) => {
  const store = admin.firestore();
  const eventId = data.eventId;
  const _updatedCalendarEvent = data.event;

  console.log("updateCalendarEvent: ", _updatedCalendarEvent);

  utils.assertUserAuth(context);

  utils.assertTypeCheck("eventId", "string", eventId);

  calendarUtils.validateCalendarEvent(_updatedCalendarEvent);
  const updatedCalendarEvent = calendarUtils.mapCalendarEventFields(
    _updatedCalendarEvent
  );

  const userId = context.auth.token.uid;

  const calendarRef = store
    .collection("calendarEvents")
    .doc(userId)
    .collection("events");

  let status = false;
  try {
    const doc = calendarRef.doc(eventId);
    const res = await doc.update(updatedCalendarEvent);
    console.log(`Successfully updated event: [${eventId}]`);
    status = true;
  } catch (err) {
    const calendarEventStr = JSON.stringify(updatedCalendarEvent);
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
