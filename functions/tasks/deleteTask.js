/**
 *
 * @function deleteTask
 * Deletes task.
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

  if (typeof taskId !== "string") {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `taskId should be a string.`
    );
  }

  const userTaskRef = database.ref(`users/${userId}/tasks/${taskId}`);

  const taskRolesRef = database.ref(`tasks/${taskId}/roles`);
  const roles = (await taskRolesRef.once("value")).val();

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

  let deleteSuccessful = false;

  await userTaskRef
    .remove()
    .then(() => {
      console.log(`Successfully deleted ${userTaskRef.toString()}.`);
      deleteSuccessful = true;
    })
    .catch((err) => {
      console.error(`Failed to delete ${userTaskRef.toString()}. `, err);
      throw new functions.https.HttpsError(
        "internal",
        `Failed to delete task[${taskId}]`
      );
    });

  return {
    success: deleteSuccessful,
  };
});
