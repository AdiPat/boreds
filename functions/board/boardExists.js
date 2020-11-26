const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.func = functions.https.onCall(async (data, context) => {
  const database = admin.database();
  const boardId = data.boardId;
  const boardRef = database.ref(`boards/${boardId}`);

  if (typeof boardId !== "string") {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `boardId must be string.`
    );
  }

  const boardSnapshot = await boardRef.once("value");
  const boardExists = boardSnapshot.exists();

  return {
    exists: boardExists,
  };
});
