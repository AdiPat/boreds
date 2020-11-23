const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.createInvite = functions.https.onCall(async (data, context) => {
  const database = admin.database();
  const fromEmail = data.fromEmail;
  const toEmail = data.toEmail;
  const boardId = data.boardId;
  const boardRef = database.ref(`boards/${boardId}`);
  const invitesRef = database.ref("invites/");

  if (
    typeof fromEmail != "string" ||
    typeof toEmail != "string" ||
    typeof boardId != "string"
  ) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `The function must be called with arguments toEmail (string), toEmail (string) and boardId (string).`
    );
  }

  if (fromEmail === toEmail) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `fromEmail [${fromEmail}] and toEmail [${toEmail}] cannot be the same.`
    );
  }

  // the user who the invite is being sent to must not already be in the list of board users
  const boardData = (await boardRef.once("value")).val();
  if (!boardData) {
    throw new functions.https.HttpsError(
      "not-found",
      `Board with ${boardId} not found.`
    );
  } else {
    const permissions = boardData.permissions;
    const readPermissions = permissions ? permissions.read : null;
    const writePermissions = permissions ? permissions.write : null;
    let foundUserRead = false;
    let foundUserWrite = false;

    if (readPermissions) {
      foundUserRead =
        Object.keys(readPermissions).filter(
          (readKey) => readPermissions[readKey] == toEmail
        ).length > 0;
    }

    if (writePermissions) {
      foundUserWrite =
        Object.keys(writePermissions).filter(
          (writeKey) => writePermissions[writeKey] == toEmail
        ).length > 0;
    }

    if (foundUserRead || foundUserWrite) {
      throw new functions.https.HttpsError(
        "already-exists",
        `User already has access to the board.`
      );
    }
  }

  return invitesRef
    .push({
      from: fromEmail,
      to: toEmail,
      boardId: boardId,
    })
    .then(() => {
      return true;
    })
    .catch((err) => {
      if (err) {
        console.log("Failed to create invite: ", err);
      }
      return false;
    });
});

exports.checkDuplicateInvite = functions.https.onCall(async (data, context) => {
  const fromEmail = context.auth.token.email;
  const toEmail = data.toEmail;
  const boardId = data.boardId;
  const userId = context.auth.uid;

  if (typeof fromEmail != "string" || typeof boardId != "string") {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `The function must be called with arguments toEmail (string) and boardId (string).`
    );
  }
  if (userId == null) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      `The userId is invalid.`
    );
  }
  const database = admin.database();
  const invitesRef = database.ref("invites/");
  const queryStr = `${fromEmail}_${toEmail}_${boardId}`;
  let foundDuplicates = null;
  try {
    const duplicatesSnapshot = await invitesRef
      .orderByChild("from_to_boardId")
      .equalTo(queryStr)
      .once("value");
    foundDuplicates = duplicatesSnapshot.exists();
  } catch (err) {
    console.error(
      `Failed to get duplicate invites from fromEmail = ${fromEmail}, toEmail = ${toEmail} and boardId = ${boardId}. `,
      err
    );
  }
  return {
    foundDuplicates,
  };
});

exports.inviteCreateTrigger = functions.database
  .ref("invites/{inviteId}")
  .onCreate(async (snapshot, context) => {
    const database = admin.database();
    const invite = snapshot.val();
    const inviteId = context.params.inviteId;
    const now = new Date();
    if (
      snapshot.hasChild("from") &&
      snapshot.hasChild("to") &&
      snapshot.hasChild("boardId")
    ) {
      const boardTitle = (
        await database.ref(`boards/${invite.boardId}/title`).once("value")
      ).val();

      const queryStr = `${invite.from}_${invite.to}_${invite.boardId}`;
      return snapshot.ref
        .update({
          id: inviteId,
          boardTitle: boardTitle,
          createdAt: now.toString(),
          from_to_boardId: queryStr,
        })
        .then(() => {
          console.log(`Successfully added invite meta data to ${inviteId}`);
          return true;
        })
        .catch((err) => {
          if (err) {
            console.error(`Failed to add meta data to ${invite.id}. `, err);
            return snapshot.ref.remove();
          }
        });
    } else {
      console.log(
        `Invite [${invite.id}] does not have from, to and boardId as children. Deleting.`
      );
      return snapshot.ref.remove();
    }
  });

exports.getAllReceivedInvites = functions.https.onCall(
  async (data, context) => {
    const userId = context.auth.uid;
    const toEmail = context.auth.token.email;
    const database = admin.database();
    const invitesRef = database.ref("invites/");
    let invites = null;
    if (userId == null) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        `Need authentication to call this function.`
      );
    }

    try {
      const invitesSnapshot = await invitesRef
        .orderByChild("to")
        .equalTo(toEmail)
        .once("value");
      invites = await invitesSnapshot.val();
    } catch (err) {
      if (err) {
        throw new functions.https.HttpsError(
          "internal",
          `Failed to get invites for userId=${userId}`
        );
      }
    }
    return {
      invites,
    };
  }
);

exports.acceptInvite = functions.https.onCall(async (data, context) => {
  const database = admin.database();
  const invite = data;
  const inviteId = invite.id;
  const userEmail = context.auth.token.email;
  const fromEmail = invite.from;
  const boardId = invite.boardId;
  const receiverUserId = context.auth.token.uid;

  if (typeof inviteId != "string") {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "acceptInvite: inviteId should be a string."
    );
  }

  if (invite.from == invite.to) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `acceptInvite: fromEmail[${fromEmail}] and toEmail[${toEmail}] can't be the same. `
    );
  }

  const inviteRef = database.ref(`invites/${inviteId}`);

  const addEmailToBoardPermissions = async (
    inviteBoardRef,
    email,
    permType
  ) => {
    return inviteBoardRef
      .child("permissions")
      .child(permType)
      .once("value", function (usersSnapshot) {
        const users = usersSnapshot.val();
        let foundUser = false;
        Object.keys(users).forEach((key) => {
          foundUser = users[key] == email;
        });
        if (!foundUser) {
          usersSnapshot.ref.push(email);
        }
      });
  };

  try {
    console.log("fromEmail: ", fromEmail);
    const boardRef = database.ref(`boards/${boardId}`);
    const inviteReceiverBoardsRef = database.ref(
      `users/${receiverUserId}/boards/${boardId}`
    );

    if (invite.to != userEmail) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "User doesn't have access to this invite"
      );
    }

    // update board read permissions
    addEmailToBoardPermissions(boardRef, userEmail, "read");

    // update board write permissions
    addEmailToBoardPermissions(boardRef, userEmail, "write");

    // add board to receivers boards
    inviteReceiverBoardsRef
      .set({ id: boardId })
      .then(() => {
        console.log(
          `Successfully added board to ${inviteReceiverBoardsRef.toString()}`
        );
      })
      .catch((err) => {
        if (err) {
          throw new functions.https.HttpsError(
            "internal",
            "Board update to users/ failed."
          );
        }
      });

    // delete invite
    inviteRef.remove((err) => {
      if (err) {
        console.log(`Failed to delete invite. `, err);
      }
    });
  } catch (err) {
    console.error(`Failed to accept invite. `, err);
  }
});

exports.rejectInvite = functions.https.onCall((data, context) => {
  const invite = data;
  const inviteId = invite.id;
  const receiverEmail = invite.to;
  const userEmail = context.auth.token.email;
  const database = admin.database();
  const inviteRef = database.ref(`invites/${inviteId}`);

  if (typeof inviteId !== "string") {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "acceptInvite: inviteId should be a string."
    );
  }

  if (receiverEmail !== userEmail) {
    throw new functions.https.HttpsError(
      "permission-denied",
      "rejectInvite: User does not have access to this invite."
    );
  }

  return inviteRef
    .remove()
    .then(() => {
      console.log(`Successfully deleted invite: ${inviteId}`);
      return true;
    })
    .catch((err) => {
      if (err) {
        console.log(`Failed to delete invite: ${inviteId}. `, err);
      }
      return false;
    });
});
