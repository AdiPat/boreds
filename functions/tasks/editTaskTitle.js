/**
 * @function changeTaskTitle()
 * Change task title.
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const _ = require("lodash");
const CONSTANTS = require("../constants").constants;

exports.func = functions.https.onCall(async (data, context) => {
  const database = admin.database();
  const newTitle = data.newTitle;
  const userId = context.auth.token.uid;
  const taskId = data.taskId;

  // type checking
  _.forEach([{ userId }, { taskId }, { newTitle }], (val) => {
    if (typeof val !== "string") {
      let field = Object.keys(val)[0];
      throw new functions.https.HttpsError(
        "invalid-argument",
        `${field} should be a string.`
      );
    }
  });

  // check new title length
  if (newTitle.length >= CONSTANTS.MAX_TASK_TITLE_LENGTH) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `taskTitle should be less than ${CONSTANTS.MAX_TASK_TITLE_LENGTH}, found ${newTitle.length}.`
    );
  }

  const taskRef = database.ref(`tasks/${taskId}`);
  const userTaskRef = database.ref(`users/${userId}/tasks/${taskId}`);
  // check permissions
  const oldTitle = (await taskRef.child("title").once("value")).val();
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
    .child("title")
    .set(newTitle)
    .then(() => {
      console.log(`Sucessfully wrote ${newTitle} to tasks/.`);
    })
    .catch((err) => {
      const errMsg = `Failed to update taskTitle for task[${taskId}] at tasks/.`;
      if (err) {
        console.error(errMsg, err);
      }
      success = false;
      throw new functions.https.HttpsError("internal", errMsg);
    });

  await userTaskRef
    .child("title")
    .set(newTitle)
    .then(() => {
      console.log(`Successfully wrote ${newTitle} to users/tasks.`);
    })
    .catch((err) => {
      const errMsg = `Failed to update taskTitle for task[${taskId}] at users/`;
      if (err) {
        console.error(errMsg, err);
      }
      success = false;
      // revert write to tasks
      // WARNING: no error handling here, if this write fails the db will be in an inconsistent state
      taskRef.child("title").set(oldTitle);
      throw new functions.https.HttpsError("internal", errMsg);
    });

  return {
    status: success,
  };
});
