const functions = require("firebase-functions");
const admin = require("firebase-admin");
const _ = require("lodash");

exports.func = functions.https.onCall(async (data, context) => {
  const database = admin.database();
  const boardLanes = data.board.lanes;
  const boardId = data.boardId;
  const userId = data.userId;
  const boardRef = database.ref(`boards/${boardId}`);
  const userRef = database.ref(`users/${userId}`);
  const user = (await userRef.once("value")).val();
  const board = (await boardRef.once("value")).val();
  const userEmail = user.email;

  if (!userId || !boardId || !boardLanes) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Pass boardId(string), userId(string) and board (object) as arguments."
    );
  }

  if (!user) {
    throw new functions.https.HttpsError("not-found", "User not found.");
  }

  if (!boardLanes) {
    throw new functions.https.HttpsError("invalid-argument", "No data found.");
  }
  // check if user has write permission
  const writePermissions = board.permissions.write;
  const hasWritePermissions = _.find(
    Object.keys(writePermissions),
    (key) => writePermissions[key] === userEmail
  );

  if (!hasWritePermissions) {
    throw new functions.https.HttpsError(
      "permission-denied",
      "User doesn't have write permissions."
    );
  }

  return boardRef
    .child("lanes")
    .set(boardLanes)
    .then(() => {
      console.log(`Successfully updated board ${boardId}.`);
      return true;
    })
    .catch((err) => {
      if (err) {
        console.error(`Failed to update board ${boardId}. `, err);
      }
      return false;
    });
});
