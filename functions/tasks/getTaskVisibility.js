/**
 * @function getTaskVisibility
 * Returns "public" or "private"
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.func = functions.https.onCall(async (data, context) => {
  console.log("getTaskVisibility() CALLED.");
  const database = admin.database();
  const taskId = data.taskId;
  const visibilityRef = database.ref(`tasks/${taskId}/public`);
  const taskCreatedRef = database.ref(`tasks/${taskId}/createdAt`);
  const taskExists = (await taskCreatedRef.once("value")).exists();

  if (!taskExists) {
    throw new functions.https.HttpsError(
      "not-found",
      `Task[${taskId}] does not exist.`
    );
  }

  const status = (await visibilityRef.once("value")).val();
  const visibility = status ? "public" : "private";

  console.log(
    `getTaskVisibility: taskId=${taskId} exists=${taskExists} visibility=${visibility}`
  );

  return {
    visibility,
  };
});
