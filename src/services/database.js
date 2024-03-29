import firebase from "firebase";
import "firebase/database";
import { getBoardTitle } from "./board";

const attachBoardUpdateListener = (boardId, updateBoardInState) => {
  const database = firebase.database();
  const boardRef = database.ref(`boards/${boardId}`);
  boardRef.on("value", function (snapshot) {
    const boardData = snapshot.val();
    //console.log("updateBoard: ", boardData);
    updateBoardInState(boardId, boardData);
  });
};

const detachBoardUpdateListener = (boardId) => {
  const database = firebase.database();
  const boardRef = database.ref(`boards/${boardId}`);
  return boardRef.off("value");
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
  const userRef = database.ref(`/users/${userId}`);
  userRef.child("boards").on("child_added", function (snapshot) {
    const board = snapshot.val();
    const boardId = board.id;
    const boardRef = database.ref(`/boards/${boardId}`);
    const userBoardRef = database.ref(`users/${userId}/boards/${boardId}`);
    boardRef.on("value", function (newSnapshot) {
      const boardData = newSnapshot.val();
      delete boardData.starred;
      updateBoardInState(boardId, boardData);
    });
    userBoardRef.on("value", function (newSnapshot) {
      const boardData = newSnapshot.val();
      const boardPartialUpdate = {
        starred: boardData.starred,
      };
      updateBoardInState(boardId, boardPartialUpdate);
    });
  });
};

const attachInvitesListener = async (userId, updateInvitesInState) => {
  const database = firebase.database();
  const userEmailRef = database.ref(`/users/${userId}/email`);
  const email = await (await userEmailRef.once("value")).val();
  try {
    const invitesRef = database.ref("/invites");
    invitesRef
      .orderByChild("to")
      .equalTo(email)
      .on("value", async function (inviteSnapshot) {
        let inviteNotifications = [];
        let invites = inviteSnapshot.val();

        if (invites) {
          for (let inviteKey in invites) {
            let inviteObj = invites[inviteKey];
            const boardId = inviteObj.boardId;
            const boardTitle = await getBoardTitle(boardId);
            let notificationData = Object.assign({}, inviteObj);
            notificationData.boardTitle = boardTitle;
            inviteNotifications.push(notificationData);
          }

          updateInvitesInState(inviteNotifications);
        }
      });
  } catch (err) {
    console.error(
      "attachInviteListener: Failed to get invite notifications. ",
      err
    );
  }
};

export {
  attachBoardUpdateListener,
  attachBoardDeleteListener,
  attachBoardAddedListener,
  attachInvitesListener,
  detachBoardUpdateListener,
};
