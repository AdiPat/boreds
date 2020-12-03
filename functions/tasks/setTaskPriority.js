/**
 * @function setTaskPriority()
 * Sets task priority and returns new priority.
 *
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const _ = require("lodash");
const CONSTANTS = require("../constants").constants;

exports.func = functions.https.onCall(async (data, context) => {
  const database = admin.database();
  const taskId = data.taskId;
  const priority = data.priority;

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

  // check if priority is valid
  const isPriorityValid = _.includes(CONSTANTS.TASK_PRIORITIES, priority);

  if (!isPriorityValid) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `Priority must be a value in [${Object.keys(CONSTANTS.TASK_PRIORITIES)}]`
    );
  }

  const taskRef = database.ref(`tasks/${taskId}/id`);

  // check if task is valid
  const taskExists = (await taskRef.once("value")).exists();

  if (!taskExists) {
    throw new functions.https.HttpsError(
      "not-found",
      `Task[${taskId}] not found.`
    );
  }
  const writeSuccessful = false;

  // write to db
  await taskRef.parent
    .child("priority")
    .set(priority)
    .then(() => {
      console.log(
        `Successfully set priority[${priority}] for task[${taskId}].`
      );
      writeSuccessful = true;
    })
    .catch((err) => {
      const errMsg = `Failed to set priority[${priority}] for task[${taskId}]`;
      if (err) {
        console.error(errMsg, err);
      }
      writeSuccessful = false;
      throw new functions.https.HttpsError("internal", errMsg);
    });

  return {
    priority,
  };
});
