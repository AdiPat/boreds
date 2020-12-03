/**
 * @function getTaskStar()
 * Returns true if task is starred
 *
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const _ = require("lodash");

exports.func = functions.https.onCall(async (data, context) => {
  const database = admin.database();
  const taskId = data.taskId;

  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Function requires authentication."
    );
  }

  const userId = context.auth.token.uid;

  // type checking
  _.forEach([{ userId }, { taskId }], (val) => {
    if (typeof val !== "string") {
      let field = Object.keys(val)[0];
      throw new functions.https.HttpsError(
        "invalid-argument",
        `${field} should be a string.`
      );
    }
  });

  // check if task is valid
  const taskRef = database.ref(`tasks/${taskId}/id`);
  const taskExists = (await taskRef.once("value")).exists();

  if (!taskExists) {
    throw new functions.https.HttpsError(
      "not-found",
      `Task[${taskId}] not found.`
    );
  }

  const starred =
    (await taskRef.parent.child("starred").once("value")).val() || false;

  return {
    starred,
  };
});
