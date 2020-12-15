const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.func = functions.database
  .ref("users/{userId}")
  .onCreate(async (snapshot, context) => {
    const userId = context.params.userId;
    const store = admin.firestore();

    try {
      const calendarEventsRef = store.collection("calendarEvents").doc(userId);
      calendarEventsRef.set({ userId: userId });
    } catch (err) {
      console.error(`Failed to add calendarEvents for user = ${userId}`);
    }
  });
