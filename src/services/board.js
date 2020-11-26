import firebase from "firebase/app";
import "firebase/database";
import uniqid from "uniqid";

// adds empty board
const addNewBoard = async (userId, boardTitle) => {
  const _addNewBoard = firebase.functions().httpsCallable("addNewBoard");
  return _addNewBoard({ userId, boardTitle });
};

// check duplicate board
const checkDuplicateBoard = async (userId, title) => {
  const database = firebase.database();
  const boardsRef = database.ref(`users/${userId}/boards/`);
  let foundDuplicate = null;
  try {
    const boardSnapshot = await boardsRef
      .orderByChild("title")
      .equalTo(title)
      .once("value");
    const boardData = await boardSnapshot.val();
    console.log("Duplicate board data: ", boardData);
    if (boardData) {
      foundDuplicate = true;
    } else {
      foundDuplicate = false;
    }
  } catch (err) {
    console.log("Failed to get duplicate board data.");
  }
  return foundDuplicate;
};

// gets boards for user
const getBoards = async (userId) => {
  const userBoardsRef = firebase.database().ref(`users/${userId}/boards`);
  let boards = {};
  try {
    const snapshot = await userBoardsRef.once("value");
    boards = snapshot.val();
    if (!boards) {
      boards = {};
    }
  } catch (err) {
    console.error(`Failed to get boards for ${userId}`, err);
  }
  return boards;
};

const getBoardTitle = async (boardId) => {
  const database = firebase.database();
  const boardsRef = database.ref(`/boards/${boardId}/title`);
  let boardTitle = "";
  try {
    boardTitle = await (await boardsRef.once("value")).val();
  } catch (err) {
    console.log(`Failed to get board title for ${boardId}. `, err);
  }
  return boardTitle;
};

const getBoardIds = async (userId) => {
  const database = firebase.database();
  const boardsRef = database.ref(`/users/${userId}/boards`);
  let boardIds = [];
  try {
    const boardsSnapshot = await boardsRef.once("value");
    const boards = boardsSnapshot.val();
    boardIds = Object.keys(boards);
  } catch (err) {
    console.error(`Failed to get boardIds for ${userId}`, err);
  }
  return boardIds;
};

const padEmptyLanes = (boardData) => {
  let updatedData = boardData;
  if (updatedData.lanes) {
    updatedData.lanes = updatedData.lanes.map((lane) => {
      let newLane = lane;
      if (!newLane.cards) {
        newLane.cards = [];
      }
      return newLane;
    });
  } else {
    updatedData.lanes = [];
  }
  return updatedData;
};

const updateBoardLastOpened = (userId, boardId, lastOpened) => {
  console.log("updateBoardLastOpened");
  const boardRef = firebase.database().ref(`boards/${boardId}`);
  boardRef.child("lastOpened").set(lastOpened.toString());
};

const getStarredBoards = (boards) => {
  const starredBoardKeys = Object.keys(boards).filter(
    (boardKey) => boards[boardKey].starred
  );
  const starredBoards = starredBoardKeys.map((boardKey) => boards[boardKey]);
  return starredBoards;
};

const getRecentBoards = (boards) => {
  const maxRecentBoards = 4;
  const recentBoardKeys = Object.keys(boards).filter(
    (boardKey) => boards[boardKey].lastOpened != null
  );
  let recentBoards = recentBoardKeys.map((boardKey) => boards[boardKey]);
  recentBoards.sort(
    (b1, b2) => new Date(b2.lastOpened) - new Date(b1.lastOpened)
  );
  recentBoards = recentBoards.slice(0, maxRecentBoards);
  return recentBoards;
};

const deleteBoard = (userId, boardId) => {
  const userBoardRef = firebase
    .database()
    .ref(`users/${userId}/boards/${boardId}`);

  userBoardRef
    .remove()
    .then(() => console.log("Remove succeeded from users/."))
    .catch((err) => console.log("Remove failed from users/. ", err));
};

const setBoardVisibility = (userId, boardId, visibility) => {
  const boardRef = firebase.database().ref(`boards/${boardId}`);
  const isBoardPublic = visibility === "public";
  boardRef
    .child("public")
    .set(isBoardPublic)
    .then(() => {
      console.log("Set board visibility public=", isBoardPublic);
    })
    .catch((err) => {
      console.log("Failed to set board visibility: ", err);
    });
};

const updateBoardData = (userId, boardId, newData) => {
  const _updateBoardLanes = firebase
    .functions()
    .httpsCallable("updateBoardLanes");

  _updateBoardLanes({ boardId: boardId, userId: userId, board: newData })
    .then((d) => {
      console.log(`Updated new data for ${boardId} ${userId}`);
    })
    .catch((err) =>
      console.log(`Failed to update lanes for ${boardId} ${userId}`, err)
    );
};

const boardExists = async (boardId) => {
  const _boardExists = firebase.functions().httpsCallable("boardExists");
  return _boardExists({ boardId: boardId })
    .then((result) => result.data.exists)
    .catch((err) => {
      console.error("boardExists(): ", err.code, err.message);
      return false;
    });
};

const isBoardPublic = async (boardId) => {
  const database = firebase.database();
  const publicReadableRef = database.ref(
    `publicReadable/boards/${boardId}/public`
  );
  let isBoardPublic = null;
  try {
    isBoardPublic = await (await publicReadableRef.once("value")).val();
  } catch (err) {
    console.error(`Failed to get public status for board: ${boardId}. `, err);
  }
  return isBoardPublic;
};

const getPublicBoard = async (boardId) => {
  const _getPublicBoard = firebase.functions().httpsCallable("getPublicBoard");
  return _getPublicBoard({ boardId })
    .then((result) => {
      return result.data.boardData;
    })
    .catch((err) => {
      console.error(
        `Failed to get public board data for boardId = ${boardId}. `,
        err
      );
    });
};

export {
  getBoards,
  getBoardTitle,
  getBoardIds,
  addNewBoard,
  checkDuplicateBoard,
  padEmptyLanes,
  updateBoardLastOpened,
  getStarredBoards,
  getRecentBoards,
  deleteBoard,
  setBoardVisibility,
  updateBoardData,
  boardExists,
  isBoardPublic,
  getPublicBoard,
};
