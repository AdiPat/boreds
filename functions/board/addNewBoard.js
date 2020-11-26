/**
 * @function addNewBoard
 * Adds board to users/ and boards/.
 *
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const _ = require("lodash");
const CONSTANTS = require("../constants").constants;

exports.func = functions.https.onCall(async (data, context) => {
  const userId = data.userId;
  const boardTitle = data.boardTitle;
  const database = admin.database();
  const userRef = database.ref(`users/${userId}`);
  let addStatus = false; // status returned to client

  // check if user is valid
  const userSnapshot = await userRef.once("value");
  const isUserValid = userSnapshot.exists();

  if (!boardTitle || typeof boardTitle !== "string") {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Board title is not valid."
    );
  }

  if (boardTitle.length >= CONSTANTS.MAX_BOARD_TITLE_LENGTH) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Board title length should be less than 200 chars."
    );
  }

  if (!isUserValid) {
    throw new functions.https.HttpsError("not-found", "Invalid user.");
  }

  // check duplicate
  const userBoardsRef = userRef.child("boards");

  const titleExists = (
    await userBoardsRef.orderByChild("title").equalTo(boardTitle).once("value")
  ).exists();

  if (titleExists) {
    throw new functions.https.HttpsError(
      "resource-exhausted",
      `Board with title ${boardTitle} already exists.`
    );
  }

  // push new board
  const newUserBoardRef = userBoardsRef.push();
  const boardId = newUserBoardRef.key;
  const now = new Date();

  const newBoardData = {
    id: boardId,
    createdAt: now.toString(),
    title: boardTitle,
    starred: false,
    public: false,
  };

  // write to users/{userId}/boards

  const usersWriteSuccessful = await newUserBoardRef
    .set(newBoardData)
    .then(() => {
      console.log(`Successfully added board [${boardTitle}] to users/.`);
      return true;
    })
    .catch((err) => {
      if (err) {
        console.error(`Failed to add board [${boardTitle}] to users/. `);
      }
      addStatus = false;
      return false;
    });

  // write to boards/{boardId}
  let boardsWriteSuccessful = false;
  if (usersWriteSuccessful) {
    const boardRef = database.ref(`boards/${boardId}`);
    boardsWriteSuccessful = await boardRef
      .update(newBoardData)
      .then(() => {
        console.log(`Successfully added board [${boardTitle}] to boards/.`);
        return true;
      })
      .catch((err) => {
        if (err) {
          console.error(
            `Failed to add board [${boardTitle}] to boards/. `,
            err
          );
        }
        addStatus = false;
        return false;
      });
  } else {
    throw new functions.https.HttpsError(
      "internal",
      `Failed to create board ${boardTitle}.`
    );
  }

  // if users write succeeded and boards write failed
  if (usersWriteSuccessful && !boardsWriteSuccessful) {
    await newUserBoardRef.remove();
    throw new functions.https.HttpsError(
      "internal",
      `Failed to create board ${boardTitle}.`
    );
  }

  addStatus = usersWriteSuccessful && boardsWriteSuccessful;

  return {
    status: addStatus,
  };
});
