/**
 * @function flipTaskStar()
 * Flips task star and returns current value of starred.
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.func = functions.https.onCall(async (data, context) => {
  const database = admin.database();
  const taskId = data.taskId;
  const taskStarredRef = database.ref(
    "users/${userId}/tasks/${taskId}/starred"
  );

  let status = false;

  const starred = (await taskStarredRef.once("value")).val() || false;
  const curStarred = !starred;

  await taskStarredRef
    .set(curStarred)
    .then(() => {
      console.log(
        `Successfully flipped star for task[${taskId}] from ${starred} to ${!starred}.`
      );
    })
    .catch((err) => {
      if (err) {
        `Failed to flip star for task[${taskId}] from ${starred} to ${!starred}.`,
          err;
        throw new functions.https.HttpsError(
          "internal",
          `Failed to update star for ${taskId}.`
        );
      }
      status = false;
    });

  return {
    starred: curStarred,
  };
});
