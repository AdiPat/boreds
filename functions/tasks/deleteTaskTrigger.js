/**
 * @function deleteTaskTrigger
 * Remove all task references.
 *
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.func = functions.database
  .ref("users/{userId}/tasks/{taskId}")
  .onDelete(async (snapshot, context) => {
    const database = admin.database();
    const taskId = context.params.taskId;
    const taskData = snapshot.val();
    let status = false;

    if (taskData.id !== taskId) {
      console.error(
        `Added taskId[${taskData.id}] and specified taskId[${taskId}] are not matching.`
      );
      status = false;
      return status;
    }

    const taskRef = database.ref(`tasks/${taskId}`);

    await taskRef
      .remove()
      .then(() => {
        console.log(`Successfully deleted ${taskRef.toString()}`);
        status;
      })
      .catch((err) => {
        if (err) {
          console.erorr(`Failed to delete ${taskRef.toString()}`);
        }
        status = false;
      });

    return {
      status,
    };
  });
