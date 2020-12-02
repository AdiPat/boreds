/**
 * @function setTaskVisibility
 * Sets task to public or private access.
 *
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const _ = require("lodash");
const CONSTANTS = require("../constants").constants;

exports.func = functions.https.onCall(async (data, context) => {
  const database = admin.database();
  const visibility = data.visibility;
  const taskId = data.taskId;

  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Function requires authentication."
    );
  }

  if (!["private", "public"].includes(visibility)) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `Visibility has to be 'public' or 'private'. Found ${visibility}.`
    );
  }

  if (typeof taskId !== "string") {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `taskId must be a string, found ${typeof taskId}.`
    );
  }

  // check if task exists
  let writeStatus = false;
  const taskRef = database.ref(`tasks/${taskId}`);
  const taskSnapshot = await taskRef.once("value");
  const taskData = taskSnapshot.val();
  const taskExists = taskSnapshot.exists();

  if (!taskExists) {
    throw new functions.https.HttpsError(
      "not-found",
      `Task with taskId[${taskId}] not found`
    );
  }

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

  // get old status and new status
  const public = visibility === "public";

  await taskRef
    .child("public")
    .set(public)
    .then(() => {
      console.log(`Set task[${taskId}] to ${visibility}.`);
      writeStatus = true;
    })
    .catch((err) => {
      if (err) {
        console.error(`Failed to set task[${taskId}] to ${visibility}.`);
        throw new functions.https.HttpsError(
          "internal",
          `Failed to set task to ${visibility}.`
        );
      }
      writeStatus = false;
    });

  return {
    status: writeStatus,
  };
});
