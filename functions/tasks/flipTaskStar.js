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
      status = true;
    })
    .catch((err) => {
      if (err) {
        `Failed to flip star for task[${taskId}] from ${starred} to ${!starred}.`,
          err;
      }
      status = false;
    });

  return {
    starred: curStarred,
  };
});
