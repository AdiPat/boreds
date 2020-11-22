const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.updatePublicBoards = functions.database
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

exports.deleteBoardTrigger = functions.database
  .ref("users/{userId}/boards/{boardId}")
  .onDelete((snapshot, context) => {
    const database = admin.database();
    const boardId = context.params.boardId;
    const boardRef = database.ref(`boards/${boardId}`);
    const publicReadableBoardRef = database.ref(
      `publicReadable/boards/${boardId}`
    );

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

    return Promise.all([boardRemoveStatus, publicReadableRemoveStatus]);
  });

exports.updateBoardUserOnCreation = functions.database
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

exports.getPublicBoard = functions.https.onCall(async (data, context) => {
  const database = admin.database();
  const boardId = data.boardId;

  if (typeof boardId != "string") {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `boardId has to be a string.`
    );
  }

  const publicReadableBoardRef = database.ref(
    `publicReadable/boards/${boardId}/public`
  );

  let publicStatus = null;

  try {
    publicStatus = await (await publicReadableBoardRef.once("value")).val();
  } catch (err) {
    if (err) {
      console.error(`Failed to get public status of board: ${boardId}`);
      throw new functions.https.HttpsError(
        "not-found",
        "Board data not found."
      );
    }
  }

  let boardData = null;

  if (publicStatus) {
    const boardRef = database.ref(`boards/${boardId}`);
    boardData = (await boardRef.once("value")).val();
  }
  return {
    boardData,
  };
});
