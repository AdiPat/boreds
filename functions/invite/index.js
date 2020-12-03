const createInvite = require("./createInvite");
const checkDuplicateInvite = require("./checkDuplicateInvite");
const getAllReceivedInvites = require("./getAllReceivedInvites");
const inviteCreateTrigger = require("./inviteCreateTrigger");
const acceptInvite = require("./acceptInvite");
const rejectInvite = require("./rejectInvite");
const createTaskInvite = require("./createTaskInvite");

exports.createInvite = createInvite.func;
exports.checkDuplicateInvite = checkDuplicateInvite.func;
exports.inviteCreateTrigger = inviteCreateTrigger.func;
exports.getAllReceivedInvites = getAllReceivedInvites.func;
exports.acceptInvite = acceptInvite.func;
exports.rejectInvite = rejectInvite.func;
exports.createTaskInvite = createTaskInvite.func;
