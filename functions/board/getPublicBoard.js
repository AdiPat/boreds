/**
 *
 * @function getPublicBoard
 * Retrieves public board data given boardId.
 *
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.func = functions.https.onCall(async (data, context) => {
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
