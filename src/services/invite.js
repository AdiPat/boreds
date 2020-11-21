import firebase from "firebase";
import "firebase/database";
import "firebase/functions";
import { getBoardTitle } from "./board";

const checkDuplicateInvite = async (fromEmail, toEmail, boardId) => {
  const _checkDuplicateInvite = firebase
    .functions()
    .httpsCallable("checkDuplicateInvite");

  return await _checkDuplicateInvite({
    toEmail: toEmail,
    boardId: boardId,
  })
    .then((result) => {
      return result.data.foundDuplicates;
    })
    .catch((err) => {
      if (err) {
        console.error("checkDuplicateInvite callable: ", err);
      }
    });
};

const createInvite = async (fromEmail, toEmail, boardId) => {
  const database = firebase.database();
  const inviteRef = database.ref("/invites");
  let creationSuccessful = false;
  await inviteRef
    .push({
      from: fromEmail,
      to: toEmail,
      boardId: boardId,
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

// todo
const acceptInvite = async (invite) => {
  const database = firebase.database();
  if (invite) {
    const inviteRef = database.ref(`/invites/${invite.id}`);
    inviteRef
      .remove()
      .then(async () => {
        // extract invite data
      })
      .catch((err) => {
        console.log("Failed to accept invite. ", err);
      });
  }
};

export {
  createInvite,
  checkDuplicateInvite,
  getAllInvites,
  getAllInviteNotifications,
  getInvitesCount,
};
