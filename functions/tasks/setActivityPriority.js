/**
 * @function setActivityPriority
 * Sets priority for activity
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const _ = require("lodash");
const CONSTANTS = require("../constants").constants;

exports.func = functions.https.onCall(async (data, context) => {
  const database = admin.database();
  const priority = data.priority;
  const taskId = data.taskId;
  const activityId = data.activityId;

  // auth check
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Function requires authentication."
    );
  }

  // type check
  _.forEach(
    [
      { taskId: taskId, type: "string" },
      { activityText: activityText, type: "string" },
      { priority: priority, type: "string" },
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

  // check priority
  const priorityValid = _.includes(CONSTANTS.TASK_PRIORITIES, priority);

  if (!priorityValid) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `Priority must be a value in [${Object.keys(CONSTANTS.TASK_PRIORITIES)}]`
    );
  }

  // check roles
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

  // change activity priority
  const activityRef = taskRef.child("activities").child(activityId);
  const activityExists = (await activityRef.once("value")).exists();

  if (!activityExists) {
    throw new functions.https.HttpsError(
      "not-found",
      `Activity[${activityId}] not found in task[${taskId}].`
    );
  }

  const priorityRef = activityRef.child("priority");

  let writeSuccessful = false;

  await priorityRef
    .set(priority)
    .then(() => {
      writeSuccessful = true;
      console.log(
        `Successfully updated priority[${priority}] for ${priorityRef.toString()}`
      );
    })
    .catch((err) => {
      const errMsg = `Failed to set priority[${priority}] for activity[${activityId}] in task[${taskId}]`;
      console.error(errMsg, err);
      throw new functions.https.HttpsError("internal", errMsg);
    });

  return {
    status: writeSuccessful,
  };
});
