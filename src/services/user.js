import firebase from "firebase/app";
import uniqid from "uniqid";
import "firebase/database";
import "firebase/auth";

const updateUserOnSignup = (userId, userObj) => {
  if (userObj !== null) {
    const userData = {
      userId: userObj.uid,
      displayName: userObj.displayName,
      email: userObj.email,
      boards: [],
    };

    firebase
      .database()
      .ref(`users/${userId}`)
      .set(userData)
      .then(() => {
        console.log("Updated user.");
      })
      .catch((err) => {
        console.log("Failed to update user. ", err);
      });
  }
};

const updateUserIfNotFound = (user) => {
  firebase
    .database()
    .ref(`users/${user.uid}`)
    .once("value")
    .then((snapshot) => {
      console.log("Login: Snapshot - ", snapshot.val());
      if (snapshot.val() === null) {
        console.log("There is no data for this user. Addding.");
        updateUserOnSignup(user.uid, user);
      }
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

const getCurrentUser = () => {
  return firebase.auth().currentUser;
};

export {
  updateUserOnSignup,
  updateUserIfNotFound,
  getBoards,
  getCurrentUser,
  addNewBoard,
};
