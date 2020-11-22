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
  const _createInvite = firebase.functions().httpsCallable("createInvite");
  return _createInvite({ fromEmail, toEmail, boardId })
    .then((result) => {
      const status = result.data;
      if (status) {
        console.log(`Successfully sent invite to ${toEmail} for ${boardId}`);
      } else {
        console.log(`Failed to send invite to ${toEmail} for ${boardId}`);
      }
      return status;
    })
    .catch((err) => {
      if (err) {
        console.error("Failed to send invite. ", err);
      }
      return false;
    });
};

const getAllReceivedInvites = async (userId) => {
  const _getAllInvites = firebase
    .functions()
    .httpsCallable("getAllReceivedInvites");

  return _getAllInvites()
    .then((result) => {
      const invites = result.data.invites;
      if (invites) {
        return invites;
      } else {
        return {};
      }
    })
    .catch((err) => {
      console.error(`Failed to get invites.`, err);
    });
};

const getAllInviteNotifications = async (userId) => {
  let inviteNotifications = [];
  try {
    const invites = await getAllReceivedInvites(userId);
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

const getReceivedInvitesCount = async (userId) => {
  const allInvites = await getAllReceivedInvites(userId);
  let inviteCount = 0;
  if (allInvites) {
    inviteCount = Object.keys(allInvites).length;
  }
  return inviteCount;
};

// todo
const acceptInvite = async (invite) => {
  const _acceptInvite = firebase.functions().httpsCallable("acceptInvite");
  return _acceptInvite(invite)
    .then((result) => {
      return result.data.success;
    })
    .catch((err) => {
      if (err) {
        console.log(`Failed to accept invite. `, invite, err);
      }
      return false;
    });
};

export {
  createInvite,
  checkDuplicateInvite,
  getAllReceivedInvites,
  getAllInviteNotifications,
  getReceivedInvitesCount,
  acceptInvite,
};
