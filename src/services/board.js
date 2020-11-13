import firebase from "firebase/app";
import "firebase/database";
import uniqid from "uniqid";

// adds empty board
const addNewBoard = async (userId, boardTitle) => {
  const errMsg = "";
  const boardId = uniqid();
  const database = firebase.database();
  const now = new Date();
  const boardData = {
    id: boardId,
    title: boardTitle,
    createdAt: now.toString(),
    starred: false,
    owner: userId,
    public: false,
    lastOpened: now.toString(),
    lanes: [
      {
        id: uniqid(),
        title: "To Do",
        cards: [
          {
            id: uniqid(),
            title: "Eat breakfast",
            description: "Make Milk and Cereal.",
          },
          {
            id: uniqid(),
            title: "Pay Bill",
            description: "Electricity bill pending.",
          },
        ],
      },
      {
        id: uniqid(),
        title: "Completed",
        cards: [
          {
            id: uniqid(),
            title: "Data Science Assignment",
            description: "Complete Linear Regression.",
          },
        ],
      },
    ],
  };
  const userBoardRef = database.ref(`users/${userId}/boards/${boardId}`);
  userBoardRef
    .set({
      id: boardId,
      title: boardTitle,
      createdAt: now.toString(),
    })
    .then(() => {
      console.log("Successfully added board to users/board ");
    })
    .catch((err) => {
      console.log("Failed to add board to users/board. ");
    });

  database
    .ref(`boards/${boardId}`)
    .set(boardData)
    .then(() => {
      console.log("Successfully added board: ", boardTitle);
    })
    .catch((err) => {
      console.error("Failed to add board.", err);
    });
};

// gets boards for user
const getBoards = async (userId) => {
  const userRef = firebase.database().ref(`users/${userId}`);
  let boards = {};
  try {
    const userSnapshot = await userRef.once("value");
    const user = userSnapshot.val();
    boards = user.boards;
    if (boards === undefined) {
      boards = {};
    }
  } catch (err) {
    console.error(`Failed to get boards for ${userId}`, err);
  }
  return boards;
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

const starBoard = (userId, boardId) => {
  const boardRef = firebase.database().ref(`boards/${boardId}/starred`);
  boardRef.set(true);
};

const unstarBoard = (userId, boardId) => {
  const boardRef = firebase.database().ref(`boards/${boardId}/starred`);
  boardRef.set(false);
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
  const boardRef = firebase.database().ref(`boards/${boardId}`);
  const userBoardRef = firebase
    .database()
    .ref(`users/${userId}/boards/${boardId}`);
  boardRef
    .remove()
    .then(() => console.log("Remove succeeded."))
    .catch((err) => console.log("Remove failed: ", err));
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
  const lanesRef = firebase.database().ref(`boards/${boardId}/lanes`);

  lanesRef
    .set(newData.lanes)
    .then((d) => {
      console.log(`Updated new data for ${boardId} ${userId}`);
    })
    .catch((err) =>
      console.log(`Failed to update lanes for ${boardId} ${userId}`, err)
    );
};

export {
  getBoards,
  getBoardIds,
  addNewBoard,
  padEmptyLanes,
  starBoard,
  unstarBoard,
  updateBoardLastOpened,
  getStarredBoards,
  getRecentBoards,
  deleteBoard,
  setBoardVisibility,
  updateBoardData,
};
