const functions = require("firebase-functions");
const moment = require("moment");

const assertTypeCheck = (field, fieldType, value) => {
  if (typeof value !== fieldType) {
    return new functions.https.HttpsError(
      "invalid-argument",
      `${field} should be of type ${fieldType}`
    );
  }
};

const assertUserAuth = (context) => {
  if (!context.auth) {
    return new functions.https.HttpsError(
      "unauthenticated",
      "Function requires authentication."
    );
  }
};

const isTimestampISO8601 = (timestampString) => {
  const momentObj = moment(timestampString, moment.ISO_8601);
  return momentObj.isValid();
};

exports.assertTypeCheck = assertTypeCheck;
exports.assertUserAuth = assertUserAuth;
exports.isTimestampISO8601 = isTimestampISO8601;
