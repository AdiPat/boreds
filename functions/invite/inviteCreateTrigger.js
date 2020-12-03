/**
 *
 * @function inviteCreateTrigger
 * Adds invite meta data to the invite reference for easy querying.
 *
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.func = functions.database
  .ref("invites/{inviteId}")
  .onCreate(async (snapshot, context) => {
    const database = admin.database();
    const invite = snapshot.val();
    const inviteId = context.params.inviteId;
    const now = new Date();

    if (snapshot.hasChild("taskId")) {
      console.log(`Invite[${invite.id}] is a task invite. Aborting trigger.`);
      return;
    }

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
