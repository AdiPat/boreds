/**
 * @function addTaskTrigger
 * Add extra task data and add it to tasks/
 *
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const CONSTANTS = require("../constants").constants;

exports.func = functions.database
  .ref("users/{userId}/tasks/{taskId}")
  .onCreate(async (snapshot, context) => {
    const database = admin.database();
    const taskData = snapshot.val();
    const userId = context.params.userId;
    const taskId = context.params.taskId;
    let status = false;

    if (taskData.id !== taskId) {
      console.error(
        `Added taskId[${taskData.id}] and specified taskId[${taskId}] are not matching.`
      );
      status = false;
      return status;
    }

    const tasksRef = database.ref(`tasks/${taskId}`);
    const userEmailRef = database.ref(`users/${userId}/email`);
    const userEmail = (await userEmailRef.once("value")).val();

    // add extra data
    let extraTaskData = Object.assign({}, taskData);
    extraTaskData.public = false;
    extraTaskData.roles = {};
    extraTaskData.roles[userEmail] = CONSTANTS.ROLES.admin;

    await tasksRef
      .set(extraTaskData)
      .then(() => {
        console.log(`Successfully added ${tasksRef.toString()}.`);
        status = true;
      })
      .catch((err) => {
        if (err) {
          console.error(`Failed to add ${tasksRef.toString()}. `, err);
        }
        status = false;
      });

    return {
      status,
    };
  });
