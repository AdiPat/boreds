import firebase from "firebase";
import "firebase/database";

const attachBoardListener = (boardId, setBoardItem) => {
  const database = firebase.database();
  const boardRef = database.ref(`boards/${boardId}`);
  boardRef.on("value", function (snapshot) {
    const boardData = snapshot.val();
    console.log(boardData);
    setBoardItem(boardId, boardData);
  });
};

export { attachBoardListener };
