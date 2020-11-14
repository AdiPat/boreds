import firebase from "firebase";
import "firebase/database";

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
  let creationSuccessful = false;
  await newInviteRef
    .set({
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

export { createInvite, checkDuplicateInvite };
