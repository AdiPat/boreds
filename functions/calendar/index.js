/**
 * Calendar API
 */

const addCalendarEvent = require("./addCalendarEvent");
const updateCalendarEvent = require("./updateCalendarEvent");

exports.addCalendarEvent = addCalendarEvent.func;
exports.updateCalendarEvent = updateCalendarEvent.func;
