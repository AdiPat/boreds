import firebase from "firebase";
import "firebase/database";

const createInvite = (fromEmail, toEmail, boardId) => {
  const database = firebase.database();
  const inviteRef = database.ref("/invites");
  const newInviteRef = inviteRef.push();
  newInviteRef.set({
    from: fromEmail,
    to: toEmail,
    boardId: boardId,
  });
};

export { createInvite };
