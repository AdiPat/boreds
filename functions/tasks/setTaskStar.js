/**
 * @function getTaskStar()
 * Sets starred for task and returns starred value
 *
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const _ = require("lodash");

exports.func = functions.https.onCall(async (data, context) => {
  const database = admin.database();
  const taskId = data.taskId;
  const starred = data.starred;

  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Function requires authentication."
    );
  }

  const userId = context.auth.token.uid;

  // type checking
  _.forEach(
    [
      { userId: userId, type: "string" },
      { taskId: taskId, type: "string" },
      { starred: starred, type: "boolean" },
    ],
    (val) => {
      const field = Object.keys(val)[0];
      const type = val.type;
      if (typeof val[field] !== type) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          `${field} should be a ${type}.`
        );
      }
    }
  );

  // check if task is valid
  const taskRef = database.ref(`tasks/${taskId}/id`);
  const taskExists = (await taskRef.once("value")).exists();

  if (!taskExists) {
    throw new functions.https.HttpsError(
      "not-found",
      `Task[${taskId}] not found.`
    );
  }

  await taskRef.parent
    .child("starred")
    .set(starred)
    .then(() => {
      console.log(`Successfully set starred[${starred}] for task[${taskId}].`);
    })
    .catch((err) => {
      const errMsg = `Failed to set starred[${starred}] for task[${taskId}].`;
      if (err) {
        console.error(errMsg, err);
      }
      throw new functions.https.HttpsError("internal", errMsg);
    });

  return {
    starred,
  };
});
