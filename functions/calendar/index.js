/**
 * Calendar API
 */

const addCalendarEvent = require("./addCalendarEvent");
const updateCalendarEvent = require("./updateCalendarEvent");
const deleteCalendarEvent = require("./deleteCalendarEvent");

exports.addCalendarEvent = addCalendarEvent.func;
exports.updateCalendarEvent = updateCalendarEvent.func;
exports.deleteCalendarEvent = deleteCalendarEvent.func;
