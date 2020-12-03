/**
 * @function getTask()
 * Returns task
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const _ = require("lodash");
const CONSTANTS = require("../constants").constants;

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
  const taskRef = database.ref(`tasks/${taskId}`);
  const taskData = (await taskRef.once("value")).val();
  const roles = taskData.roles;

  const hasPermissions = _.find(
    Object.keys(
      Object.keys(roles),
      (key) => key === userId && roles[key] === CONSTANTS.ROLES.admin
    )
  );

  if (!hasPermissions) {
    throw new functions.https.HttpsError(
      "permission-denied",
      `User doesn't have access to this task[${taskId}].`
    );
  }

  const userTaskRef = database.ref(`users/${userId}/tasks/${taskId}`);
  const userTaskData = (await userTaskRef.once("value")).val();

  // data is in tasks but not in users/tasks
  if (!userTaskData) {
    throw new functions.https.HttpsError(
      "not-found",
      `Task[${taskId}] not found.`
    );
  }

  // add user specific fields
  taskData.starred = userTaskData.starred || false;
  taskData.public = userTaskData.public || false;

  return {
    data: taskData,
  };
});
