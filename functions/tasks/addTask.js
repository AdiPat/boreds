/**
 * @function addTask
 * Adds a task.
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const _ = require("lodash");
const { user } = require("firebase-functions/lib/providers/auth");
const CONSTANTS = require("../constants").constants;

exports.func = functions.https.onCall(async (data, context) => {
  const database = admin.database();
  const userId = context.auth.token.uid;
  const taskTitle = data.taskTitle;
  const taskDescription = data.taskDescription;

  // type checking
  _.forEach([{ userId }, { taskTitle }, { taskDescription }], (val) => {
    if (typeof val !== "string") {
      let field = Object.keys(val)[0];
      throw new functions.https.HttpsError(
        "invalid-argument",
        `${field} should be a string.`
      );
    }
  });

  // data validity
  if (taskTitle.length == 0) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Task title is empty."
    );
  }

  if (taskDescription.length == 0) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Task description is empty."
    );
  }

  if (taskTitle.length > CONSTANTS.MAX_TASK_TITLE_LENGTH) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `Task title length should be less than ${CONSTANTS.MAX_TASK_TITLE_LENGTH}, found ${taskTitle.length}.`
    );
  }

  if (taskDescription.length > CONSTANTS.MAX_TASK_DESCRIPTION_LENGTH) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `Task description length should be less than ${CONSTANTS.MAX_TASK_DESCRIPTION_LENGTH}, found ${taskDescription.length}.`
    );
  }

  // check if user exists
  const userRef = database.ref(`users/${userId}`);
  const userExists = (await userRef("once")).exists();

  if (!userExists) {
    throw new functions.https.HttpsError("permission-denied", "Invalid user.");
  }

  const tasksRef = userRef.child("tasks");
  const newTaskRef = tasksRef.push();
  const taskId = newTaskRef.key;
  const taskData = {
    id: taskId,
    title: taskTitle,
    description: taskDescription,
    starred: false,
  };

  let writeSuccessful = false;

  await newTaskRef
    .set(taskData)
    .then(() => {
      console.log(`Successfully created task at: `, newTaskRef.toString());
      writeSuccessful = true;
    })
    .catch((err) => {
      if (err) {
        console.error(`Failed to create task at: `, newTaskRef.toString());
        writeSuccessful = false;
        newTaskRef.remove();
        throw new functions.https.HttpsError(
          "internal",
          `Failed to create task | taskTitle=${title} | taskDescription=${description}`
        );
      }
    });

  return {
    success: writeSuccessful,
  };
});
