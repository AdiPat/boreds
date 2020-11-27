/**
 * @function setTaskVisibility
 * Sets task to public or private access.
 *
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");

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

  if (visibility !== "public" || visibility !== "private") {
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

  let taskSnapshot = await taskRef.once("value");

  const taskExists = taskSnapshot.exists();
  if (!taskExists) {
    throw new functions.https.HttpsError(
      "not-found",
      `Task with taskId[${taskId}] not found`
    );
  }
  // get old status and new status
  const public = visibility === "public";
  let oldPublicStatus = taskSnapshot.val().public ? "public" : "private";

  await snapshot.ref
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
    visibility: writeStatus ? visibility : oldPublicStatus,
  };
});
