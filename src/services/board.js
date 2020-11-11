import firebase from "firebase/app";
import "firebase/database";
import uniqid from "uniqid";

// adds empty board
const addNewBoard = async (userId, boardTitle) => {
  const errMsg = "";
  const boardId = uniqid();
  const database = firebase.database();
  const boardData = {
    id: boardId,
    title: boardTitle,
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
  database
    .ref(`/users/${userId}/boards/${boardId}`)
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
  let boards = [];
  try {
    const userSnapshot = await userRef.once("value");
    const user = userSnapshot.val();
    boards = user.boards;
    if (boards === undefined) {
      boards = [];
    }
  } catch (err) {
    console.error(`Failed to get boards for ${userId}`, err);
  }
  return boards;
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
  const boardRef = firebase
    .database()
    .ref(`/users/${userId}/boards/${boardId}/starred`);
  boardRef.set(true);
};

const unstarBoard = (userId, boardId) => {
  const boardRef = firebase
    .database()
    .ref(`/users/${userId}/boards/${boardId}/starred`);
  boardRef.set(false);
};

export { getBoards, addNewBoard, padEmptyLanes, starBoard, unstarBoard };
