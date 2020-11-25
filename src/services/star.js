import firebase from "firebase/app";

const starBoard = (userId, boardId) => {
  const boardRef = firebase
    .database()
    .ref(`users/${userId}/boards/${boardId}/starred`);
  boardRef.set(true);
};

const unstarBoard = (userId, boardId) => {
  const boardRef = firebase
    .database()
    .ref(`users/${userId}/boards/${boardId}/starred`);
  boardRef.set(false);
};

const attachStarListener = (userId, boardId, updateStarInState) => {
  const database = firebase.database();
  const boardRef = database.ref(`users/${userId}/boards/${boardId}/starred`);
  boardRef.on("value", function (snapshot) {
    const starred = snapshot.val() || false;
    updateStarInState(starred);
  });
};

const detachStarListener = (userId, boardId) => {
  const database = firebase.database();
  const boardRef = database.ref(`users/${userId}/${boardId}/starred`);
  boardRef.off("value");
};

export { starBoard, unstarBoard, attachStarListener, detachStarListener };
