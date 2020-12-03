/**
 * @function changeTaskDescription()
 * Change task description.
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const _ = require("lodash");
const CONSTANTS = require("../constants").constants;

exports.func = functions.https.onCall(async (data, context) => {
  const database = admin.database();
  const newDescription = data.newDescription;
  const taskId = data.taskId;

  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Function requires authentication."
    );
  }

  const userId = context.auth.token.uid;

  // type checking
  _.forEach([{ userId }, { taskId }, { newDescription }], (val) => {
    if (typeof val !== "string") {
      let field = Object.keys(val)[0];
      throw new functions.https.HttpsError(
        "invalid-argument",
        `${field} should be a string.`
      );
    }
  });

  // check new title length
  if (newTitle.length >= CONSTANTS.MAX_TASK_DESCRIPTION_LENGTH) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `taskDescription should be less than ${CONSTANTS.MAX_TASK_DESCRIPTION_LENGTH}, found ${newDescription.length}.`
    );
  }

  const taskRef = database.ref(`tasks/${taskId}`);
  const userTaskRef = database.ref(`users/${userId}/tasks/${taskId}`);
  // check permissions
  const oldDescription = (
    await taskRef.child("description").once("value")
  ).val();
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

  let success = true;

  await taskRef
    .child("description")
    .set(newDescription)
    .then(() => {
      console.log(`Sucessfully wrote ${newDescription} to tasks/.`);
    })
    .catch((err) => {
      const errMsg = `Failed to update taskDescription for task[${taskId}] at tasks/.`;
      if (err) {
        console.error(errMsg, err);
      }
      success = false;
      throw new functions.https.HttpsError("internal", errMsg);
    });

  await userTaskRef
    .child("description")
    .set(newDescription)
    .then(() => {
      console.log(`Successfully wrote ${newDescription} to users/tasks.`);
    })
    .catch((err) => {
      const errMsg = `Failed to update taskDescription for task[${taskId}] at users/`;
      if (err) {
        console.error(errMsg, err);
      }
      success = false;
      // revert write to tasks
      // WARNING: no error handling here, if this write fails the db will be in an inconsistent state
      taskRef.child("description").set(oldDescription);
      throw new functions.https.HttpsError("internal", errMsg);
    });

  return {
    status: success,
  };
});
