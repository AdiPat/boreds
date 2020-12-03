/**
 *
 * @function getTasks()
 * Gets list of tasks
 *
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const _ = require("lodash");

exports.func = functions.https.onCall(async (data, context) => {
  const database = admin.database();

  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Function requires authentication."
    );
  }

  const userId = context.auth.token.uid;

  // check if user exists
  const userRef = database.ref(`users/${userId}/userId`);
  const userExists = (await userRef.once("value")).exists();

  if (!userExists) {
    throw new functions.https.HttpsError("permission-denied", "Invalid user.");
  }

  const userTasks =
    (await userRef.parent.child("tasks").once("value")).val() || {};

  return {
    tasks: userTasks,
  };
});
