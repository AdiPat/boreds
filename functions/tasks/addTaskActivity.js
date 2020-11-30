/**
 * @function addTaskActivity
 *
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const CONSTANTS = require("../constants").constants;

exports.func = functions.https.onCall(async (data, context) => {
  const database = admin.database();
  const taskId = data.taskId;
  const activityText = data.activityText;
  const position = data.position;

  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Function requires authentication."
    );
  }

  const userId = context.auth.token.userId;

  // type checking
  _.forEach(
    [
      { taskId: taskId, type: "string" },
      { activityText: activityText, type: "string" },
      { userId: userId, type: "string" },
      { position: position, type: "number" },
    ],
    (val) => {
      let field = Object.keys(val)[0];
      const type = val.type;
      if (typeof val[field] !== type) {
        if (field == "position" && !Number.isInteger(position)) {
          throw new functions.https.HttpsError(
            "invalid-argument",
            `position should be an integer.`
          );
        }
        throw new functions.https.HttpsError(
          "invalid-argument",
          `${field} should be a ${type}`
        );
      }
    }
  );

  // activityText length
  if (activityText.length >= CONSTANTS.MAX_TASK_ACTIVITY_LENGTH) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `activityText should be less than ${CONSTANTS.MAX_TASK_ACTIVITY_LENGTH}, found ${activityText.length}`
    );
  }

  const taskRef = database.ref(`tasks/${taskId}`);

  // check permissions
  const roles = (await taskRef.child("roles").once("value")).val();

  const hasPermissions = _.find(
    Object.keys(roles),
    (key) => key === userId && roles[key] == CONSTANTS.ROLES.admin
  );

  if (!hasPermissions) {
    throw new functions.https.HttpsError(
      "permission-denied",
      `User doesn't have permission to edit task[${taskId}].`
    );
  }

  let writeSuccess = false;

  // update lastUpdated
  await taskRef
    .child("activities")
    .push()
    .set({
      position: postition,
      text: activityText,
    })
    .then(() => {
      console.log(
        `Succesfully wrote activity[${activityText}] to task[${taskId}]`
      );
      writeSuccess = true;
    })
    .catch((err) => {
      const errMsg = `Failed to write activity[${activityText}] to task[${taskId}]`;
      writeSuccess = false;
      console.error(errMsg, err);
      throw new functions.https.HttpsError("internal", errMsg);
    });

  return {
    status: writeSuccess,
  };
});
