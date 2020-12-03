/**
 * @function deleteTaskActivity
 * Deletes task activity
 *
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const _ = require("lodash");

exports.func = functions.https.onCall(async (data, context) => {
  const database = admin.database();
  const taskId = data.taskId;
  const activityId = data.activityId;

  // check auth
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Function requires authentication."
    );
  }

  // type checking
  _.forEach(
    [
      { taskId: taskId, type: "string" },
      { activityId: activityId, type: "string" },
    ],
    (val) => {
      let field = Object.keys(val)[0];
      const type = val.type;
      if (typeof val[field] !== type) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          `${field} should be a ${type}`
        );
      }
    }
  );

  const activityRef = database.ref(`tasks/${taskId}/activities/${activityId}`);
  let deleteSuccessful = false;

  await activityRef
    .remove()
    .then(() => {
      deleteSuccessful = true;
    })
    .catch((err) => {
      const errMsg = `Failed to delete activity[${activityId}] in task[${taskId}].`;
      console.error(errMsg, err);
      deleteSuccessful = false;
      throw new functions.https.HttpsError("internal", errMsg);
    });

  return {
    status: deleteSuccessful,
  };
});
