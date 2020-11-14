import firebase from "firebase";
import "firebase/database";

const createInvite = (fromEmail, toEmail, boardId) => {
  const database = firebase.database();
  const inviteRef = database.ref("/invites");
  let foundDuplicate = false;
  inviteRef
    .orderByChild("to")
    .equalTo(toEmail)
    .once("value", function (snapshot) {
      const foundInvites = snapshot.val();
      if (foundInvites) {
        Object.keys(foundInvites).forEach((inviteKey) => {
          const curInvite = foundInvites[inviteKey];
          if (curInvite.boardId == boardId) {
            foundDuplicate = true;
          }
        });
      }
      if (!foundDuplicate) {
        const newInviteRef = inviteRef.push();
        newInviteRef.set({
          from: fromEmail,
          to: toEmail,
          boardId: boardId,
        });
      }
    });
};

export { createInvite };
