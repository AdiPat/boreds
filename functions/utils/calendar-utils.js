const functions = require("firebase-functions");
const CONSTANTS = require("../constants").constants;
const utils = require("./utils");

const validateCalendarEventTitle = (title) => {
  const fieldName = CONSTANTS.CALENDAR.EVENT.FIELDS.eventTitle.field;
  const fieldType = CONSTANTS.CALENDAR.EVENT.FIELDS.eventTitle.type;

  utils.assertTypeCheck(fieldName, fieldType, title);

  if (title.length == 0) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `${fieldName} cannot be empty.`
    );
  }

  if (title.length > CONSTANTS.CALENDAR.MAX_EVENT_TITLE_LENGTH) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `${fieldName} should be less than ${CONSTANTS.CALENDAR.MAX_EVENT_TITLE_LENGTH} characters.`
    );
  }
};

const validateCalendarTimestamp = (timestamp, fieldName, fieldType) => {
  utils.assertTypeCheck(fieldName, fieldType, timestamp);

  const isValid = utils.isTimestampISO8601(timestamp);

  if (!isValid) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `${fieldName} should be a ISO8601 string.`
    );
  }
};

const validateCalendarEventDate = (timestamp) => {
  const fieldName = CONSTANTS.CALENDAR.EVENT.FIELDS.eventDate.field;
  const fieldType = CONSTANTS.CALENDAR.EVENT.FIELDS.eventDate.type;

  validateCalendarTimestamp(timestamp, fieldName, fieldType);
};

const validateCalendarEventStartTime = (timestamp) => {
  const fieldName = CONSTANTS.CALENDAR.EVENT.FIELDS.eventStartTime.field;
  const fieldType = CONSTANTS.CALENDAR.EVENT.FIELDS.eventStartTime.type;

  validateCalendarTimestamp(timestamp, fieldName, fieldType);
};

const validateCalendarEventEndTime = (timestamp) => {
  const fieldName = CONSTANTS.CALENDAR.EVENT.FIELDS.eventEndTime.field;
  const fieldType = CONSTANTS.CALENDAR.EVENT.FIELDS.eventEndTime.type;

  validateCalendarTimestamp(timestamp, fieldName, fieldType);
};

const validateCalendarEventDescription = (description) => {
  const fieldName = CONSTANTS.CALENDAR.EVENT.FIELDS.eventDescription.field;
  const fieldType = CONSTANTS.CALENDAR.EVENT.FIELDS.eventDescription.type;

  utils.assertTypeCheck(fieldName, fieldType, description);

  if (description.length > CONSTANTS.CALENDAR.MAX_EVENT_DESCRIPTION_LENGTH) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `${fieldName} should be less than ${CONSTANTS.CALENDAR.MAX_EVENT_DESCRIPTION_LENGTH} characters.`
    );
  }
};

const validateCalendarEvent = (calendarEvent) => {
  const {
    eventTitle,
    eventDescription,
    eventDate,
    eventStartTime,
    eventEndTime,
  } = calendarEvent;

  validateCalendarEventTitle(eventTitle);
  validateCalendarEventDescription(eventDescription);
  validateCalendarEventDate(eventDate);
  validateCalendarEventStartTime(eventStartTime);
  validateCalendarEventEndTime(eventEndTime);
};

exports.validateCalendarEvent = validateCalendarEvent;
exports.validateCalendarEventTitle = validateCalendarEventTitle;
exports.validateCalendarEventDescription = validateCalendarEventDescription;
exports.validateCalendarEventDate = validateCalendarEventDate;
exports.validateCalendarEventStartTime = validateCalendarEventStartTime;
exports.validateCalendarEventEndTime = validateCalendarEventEndTime;
