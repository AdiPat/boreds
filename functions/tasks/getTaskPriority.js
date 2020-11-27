/**
 * @function getTaskPriority()
 * Returns task priority
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

  const userId = context.auth.token.userId;

  // type checking
  _.forEach([{ userId }, { taskId }, { priority }], (val) => {
    if (typeof val !== "string") {
      let field = Object.keys(val)[0];
      throw new functions.https.HttpsError(
        "invalid-argument",
        `${field} should be a string.`
      );
    }
  });

  const taskRef = database.ref(`tasks/${taskId}/id`);

  // check if task is valid
  const taskExists = (await taskRef.once("value")).exists();

  if (!taskExists) {
    throw new functions.https.HttpsError(
      "not-found",
      `Task[${taskId}] not found.`
    );
  }

  const priority = (await taskRef.parent.child("priority").once("value")).val();

  return {
    priority,
  };
});
