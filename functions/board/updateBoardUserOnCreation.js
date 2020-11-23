/**
 *
 * @function updateBoardUserOnCreation
 * Adds current user to board read permissions and write permissions after creation.
 *
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.func = functions.database
  .ref("users/{userId}/boards/{boardId}")
  .onCreate(async (snapshot, context) => {
    const database = admin.database();
    const userId = context.params.userId;
    const boardId = context.params.boardId;
    const boardRef = database.ref(`boards/${boardId}/permissions`);
    const userEmailRef = database.ref(`users/${userId}/email`);
    const userEmail = await (await userEmailRef.once("value")).val();

    const readUpdate = boardRef
      .child("read")
      .push(userEmail)
      .then(() => {
        console.log(
          `Successfully updated read permissions for ${userEmail} and ${boardId}`,
          boardRef.toString()
        );
      })
      .catch((err) => {
        if (err) {
          console.error(
            `Failed to update read permissions for ${userEmail} and ${boardId}`,
            boardRef.toString()
          );
        }
        return false;
      });

    const writeUpdate = boardRef
      .child("write")
      .push(userEmail)
      .then(() => {
        console.log(
          `Successfully updated write permissions for ${userEmail} and ${boardId}`,
          boardRef.toString()
        );
      })
      .catch((err) => {
        if (err) {
          console.error(
            `Failed to update write permissions for ${userEmail} and ${boardId}`,
            boardRef.toString()
          );
        }
        return false;
      });

    return Promise.all([readUpdate, writeUpdate]);
  });
