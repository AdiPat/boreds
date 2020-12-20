const functions = require("firebase-functions");
const CONSTANTS = require("../constants").constants;
const moment = require("moment");
const utils = require("./utils");

const validateCalendarEventTitle = (title) => {
  const fieldName = CONSTANTS.CALENDAR.EVENT.FIELDS.eventTitle.field;
  const fieldType = CONSTANTS.CALENDAR.EVENT.FIELDS.eventTitle.type;

  utils.assertTypeCheck(fieldName, fieldType, title);

  if (title.length == 0) {
    const errMsg = `${fieldName} cannot be empty.`;
    throw new functions.https.HttpsError("invalid-argument", errMsg, errMsg);
  }

  if (title.length > CONSTANTS.CALENDAR.MAX_EVENT_TITLE_LENGTH) {
    const errMsg = `${fieldName} should be less than ${CONSTANTS.CALENDAR.MAX_EVENT_TITLE_LENGTH} characters.`;
    throw new functions.https.HttpsError("invalid-argument", errMsg, errMsg);
  }
};

const validateCalendarTimestamp = (timestamp, fieldName, fieldType) => {
  utils.assertTypeCheck(fieldName, fieldType, timestamp);

  const isValid = utils.isTimestampISO8601(timestamp);

  if (!isValid) {
    const errMsg = `${fieldName} should be a ISO8601 string.`;
    throw new functions.https.HttpsError("invalid-argument", errMsg, errMsg);
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
    const errMsg = `${fieldName} should be less than ${CONSTANTS.CALENDAR.MAX_EVENT_DESCRIPTION_LENGTH} characters.`;
    throw new functions.https.HttpsError("invalid-argument", errMsg, errMsg);
  }
};

const validateCalendarEventDuration = (startTime, endTime) => {
  const endTimeFieldName = CONSTANTS.CALENDAR.EVENT.FIELDS.eventEndTime.field;
  const startTimeFieldName =
    CONSTANTS.CALENDAR.EVENT.FIELDS.eventStartTime.field;

  if (endTime <= startTime) {
    const errMsg = `${endTimeFieldName} should be greater than ${startTimeFieldName}`;
    throw new functions.https.HttpsError("invalid-argument", errMsg, errMsg);
  }
};

const mapCalendarEventFields = (calendarEvent) => {
  let _calendarEvent = {};
  Object.keys(calendarEvent).forEach((field) => {
    const localField = CONSTANTS.CALENDAR.EVENT.FIELDS[field].localField;
    _calendarEvent[localField] = calendarEvent[field];
  });
  return _calendarEvent;
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
  validateCalendarEventDuration(eventStartTime, eventEndTime);
};

exports.validateCalendarEvent = validateCalendarEvent;
exports.validateCalendarEventTitle = validateCalendarEventTitle;
exports.validateCalendarEventDescription = validateCalendarEventDescription;
exports.validateCalendarEventDate = validateCalendarEventDate;
exports.validateCalendarEventStartTime = validateCalendarEventStartTime;
exports.validateCalendarEventEndTime = validateCalendarEventEndTime;
exports.validateCalendarEventDuration = validateCalendarEventDescription;
exports.mapCalendarEventFields = mapCalendarEventFields;
