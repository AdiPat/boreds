/**
 *
 * @function deleteBoardTrigger
 * Deletes board related data after deletion.
 * Does 3 things.
 * 1. Deletes board.
 * 2. Deletes boards publicReadable references.
 * 3. Deletes all board invites.
 *
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.func = functions.database
  .ref("users/{userId}/boards/{boardId}")
  .onDelete((snapshot, context) => {
    const database = admin.database();
    const boardId = context.params.boardId;
    const boardRef = database.ref(`boards/${boardId}`);
    const publicReadableBoardRef = database.ref(
      `publicReadable/boards/${boardId}`
    );
    const invitesRef = database.ref("invites/");

    const removeData = async (ref) => {
      let successStatus = false;
      await ref.remove((err) => {
        const refString = ref
          .toString()
          .substring(database.ref().toString().length - 1);
        if (err) {
          console.error(`Failed to remove ${refString}`, err);
          successStatus = false;
        } else {
          console.log(`Successfully removed ${refString}`);
          successStatus = true;
        }
      });
      return successStatus;
    };

    const boardRemoveStatus = removeData(boardRef);
    const publicReadableRemoveStatus = removeData(publicReadableBoardRef);
    // delete all invites corresponding to board
    const invitesRemoveStatus = invitesRef
      .orderByChild("boardId")
      .equalTo(boardId)
      .once("value")
      .then((snapshot) => {
        const updates = {};
        snapshot.forEach((child) => (updates[child.key] = null));
        invitesRef.update(updates);
        return true;
      });

    return Promise.all([
      boardRemoveStatus,
      publicReadableRemoveStatus,
      invitesRemoveStatus,
    ]);
  });
