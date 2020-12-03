/**
 * @functions createInvite
 * Creates invite when user1 invites user2
 *
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const _ = require("lodash");
const validator = require("email-validator");
const CONSTANTS = require("../constants").constants;

exports.func = functions.https.onCall(async (data, context) => {
  const database = admin.database();
  const toEmail = data.toEmail;
  const taskId = data.taskId;

  // auth check
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Function requires authentication."
    );
  }

  const userId = context.auth.token.uid;
  const userEmail = context.auth.token.email;

  // type checking
  // type checking
  _.forEach(
    [
      { userId: userId, type: "string" },
      { taskId: taskId, type: "string" },
      { toEmail: toEmail, type: "string" },
    ],
    (val) => {
      const field = Object.keys(val)[0];
      const type = val.type;
      if (typeof val[field] !== type) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          `${field} should be a ${type}.`
        );
      }
    }
  );

  if (toEmail === userEmail) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `fromEmail [${userEmail}] and toEmail [${toEmail}] cannot be the same.`
    );
  }

  // validate toEmail
  const isEmailValid = validator.validate(toEmail);
  if (!isEmailValid) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `Email address provided ${toEmail} is not in valid format.`
    );
  }

  // check task
  const taskCreatedRef = database.ref(`tasks/${taskId}/createdAt`);
  const taskExists = (await taskCreatedRef.once("value")).exists();

  if (!taskExists) {
    throw new functions.https.HttpsError(
      "not-found",
      `Task[${taskId}] doesn't exist or has been deleted.`
    );
  }

  // get user id
  const userRef = database.ref("users/");
  const userData = (
    await userRef.orderByChild("email").equalTo(toEmail).once("value")
  ).val();

  if (!userData) {
    throw new functions.https.HttpsError(
      "not-found",
      `${toEmail} is not a boreds user. Ask them to sign up first.`
    );
  }

  const toUserId = userData.userId;
  // check permissions
  const taskPermissionsRef = database.ref(`tasks/${taskId}/roles`);
  const roles = (await taskPermissionsRef.once("value")).val();
  const isUserFound = _.find(
    Object.keys(roles),
    (key) => key === toUserId && roles[key] === CONSTANTS.ROLES.admin
  );

  if (isUserFound) {
    throw new functions.https.HttpsError(
      "resource-exhausted",
      `${toEmail} already has access to this task.`
    );
  }

  const inviteRef = database.ref(`invites/`);
  // check if invite exists
  const existingInvites = (
    await inviteRef.orderByChild("taskId").equalTo(taskId).once("value")
  ).val();

  const foundInvite = _.find(
    Object.keys(existingInvites),
    (key) => existingInvites[key].to === toEmail
  );

  if (foundInvite) {
    throw new functions.https.HttpsError(
      "already-exists",
      `You have already sent an invite for this task to ${toEmail}`
    );
  }

  // create invite
  const now = new Date().getTime();
  let inviteSent = false;

  const newInviteRef = inviteRef.push();

  await newInviteRef
    .set({
      id: newInviteRef.key,
      from: userEmail,
      to: toEmail,
      taskId: taskId,
      timestamp: now,
    })
    .then(() => {
      console.log(
        `Successfully sent invite from=${userEmail} to=${toEmail} taskId=${taskId}`
      );
      inviteSent = true;
    })
    .catch((err) => {
      throw new functions.https.HttpsError(
        "internal",
        `Failed to send invite to ${toEmail}.`
      );
    });

  return {
    status: inviteSent,
  };
});
