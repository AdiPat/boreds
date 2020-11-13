import firebase from "firebase";
import "firebase/database";

const attachBoardUpdateListener = (boardId, updateBoardInState) => {
  const database = firebase.database();
  const boardRef = database.ref(`boards/${boardId}`);
  boardRef.on("value", function (snapshot) {
    const boardData = snapshot.val();
    console.log("updateBoard: ", boardData);
    updateBoardInState(boardId, boardData);
  });
};

const attachBoardDeleteListener = (userId, deleteBoardFromState) => {
  const database = firebase.database();
  const userBoardRef = database.ref(`/users/${userId}/boards`);
  userBoardRef.on("child_removed", function (oldSnapshot) {
    const oldBoardItem = oldSnapshot.val();
    const oldBoardId = oldBoardItem.id;
    deleteBoardFromState(oldBoardId);
  });
};

const attachBoardAddedListener = (userId, updateBoardInState) => {
  const database = firebase.database();
  const userBoardRef = database.ref(`/users/${userId}/boards`);
  userBoardRef.on("child_added", function (snapshot) {
    const board = snapshot.val();
    const boardId = board.id;
    const boardRef = database.ref(`/boards/${boardId}`);
    boardRef
      .once("value")
      .then((snapshot) => {
        const boardData = snapshot.val();
        updateBoardInState(boardId, boardData);
      })
      .catch((err) => {
        console.log(`Failed to add ${userId} ${boardId}`);
      });
  });
};

export {
  attachBoardUpdateListener,
  attachBoardDeleteListener,
  attachBoardAddedListener,
};
