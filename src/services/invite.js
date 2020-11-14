import firebase from "firebase";
import "firebase/database";
import { getBoardTitle } from "./board";

const checkDuplicateInvite = async (fromEmail, toEmail, boardId) => {
  const database = firebase.database();
  const inviteRef = database.ref("/invites");
  let foundDuplicate = false;
  const queryStr = `${fromEmail}_${toEmail}_${boardId}`;
  await inviteRef
    .orderByChild("from_to_boardId")
    .equalTo(queryStr)
    .once("value", function (snapshot) {
      const foundInvites = snapshot.val();
      if (foundInvites) {
        foundDuplicate = true;
      }
    });
  return foundDuplicate;
};

const createInvite = async (fromEmail, toEmail, boardId) => {
  const database = firebase.database();
  const inviteRef = database.ref("/invites");
  const newInviteRef = inviteRef.push();
  const newInviteId = (await newInviteRef).key;
  let creationSuccessful = false;
  await newInviteRef
    .set({
      id: newInviteId,
      from: fromEmail,
      to: toEmail,
      boardId: boardId,
      from_to_boardId: fromEmail + "_" + toEmail + "_" + boardId, // for duplicate query
    })
    .then(() => {
      creationSuccessful = true;
    })
    .catch((err) => {
      console.log("Failed to create invite: ", err);
      creationSuccessful = false;
    });
  return creationSuccessful;
};

const getAllInvites = async (userId) => {
  const database = firebase.database();
  const userEmailRef = database.ref(`/users/${userId}/email`);
  let invites = {};
  const email = await (await userEmailRef.once("value")).val();
  const invitesRef = database.ref("/invites");
  await invitesRef
    .orderByChild("to")
    .equalTo(email)
    .once("value", function (inviteSnapshot) {
      invites = Object.assign({}, inviteSnapshot.val());
    });
  return invites;
};

const getAllInviteNotifications = async (userId) => {
  let inviteNotifications = [];
  try {
    const invites = await getAllInvites(userId);
    if (invites) {
      Object.keys(invites).forEach(async (inviteKey) => {
        let inviteObj = invites[inviteKey];
        const boardId = inviteObj.boardId;
        const boardTitle = await getBoardTitle(boardId);
        let notificationData = Object.assign({}, inviteObj);
        notificationData.boardTitle = boardTitle;
        inviteNotifications.push(notificationData);
      });
    }
  } catch (err) {
    console.error(
      "getAllInviteNotifications: Failed to get invite notifications. ",
      err
    );
  }
  return inviteNotifications;
};

const getInvitesCount = async (userId) => {
  const allInvites = await getAllInvites(userId);
  let inviteCount = 0;
  if (allInvites) {
    inviteCount = Object.keys(allInvites).length;
  }
  return inviteCount;
};

export { createInvite, checkDuplicateInvite, getAllInvites };

export {
  createInvite,
  checkDuplicateInvite,
  getAllInvites,
  getAllInviteNotifications,
  getInvitesCount,
};
