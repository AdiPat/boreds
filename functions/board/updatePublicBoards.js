/**
 *
 * @function updatedPublicBoards
 * Adds board to publicReadable whenever board's public flag is set to true.
 *
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.func = functions.database
  .ref("boards/{boardId}/public")
  .onUpdate((snapshot, context) => {
    const updatedPublicFlag = snapshot.after.val();
    const boardId = context.params.boardId;
    const database = admin.database();
    const publicReadableRef = database.ref(`publicReadable/boards/${boardId}`);
    publicReadableRef
      .set({
        id: boardId,
        public: updatedPublicFlag,
      })
      .then(() => {
        console.log(`Successfully updated publicReadable for ${boardId}.`);
        return true;
      })
      .catch((err) => {
        if (err) {
          console.error(`Failed to update publicReadable for ${boardId}`, err);
        }
        return false;
      });
  });
