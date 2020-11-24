const functions = require("firebase-functions");
const admin = require("firebase-admin");
const boardFunctions = require("./board/index");
const inviteFunctions = require("./invite/index");

admin.initializeApp();

// board functions
exports.updatePublicBoards = boardFunctions.updatePublicBoards;
exports.deleteBoardTrigger = boardFunctions.deleteBoardTrigger;
exports.updateBoardUserOnCreation = boardFunctions.updateBoardUserOnCreation;
exports.getPublicBoard = boardFunctions.getPublicBoard;
exports.updateBoardLanes = boardFunctions.updateBoardLanes;

// invite functions
exports.checkDuplicateInvite = inviteFunctions.checkDuplicateInvite;
exports.inviteCreateTrigger = inviteFunctions.inviteCreateTrigger;
exports.getAllReceivedInvites = inviteFunctions.getAllReceivedInvites;
exports.createInvite = inviteFunctions.createInvite;
exports.acceptInvite = inviteFunctions.acceptInvite;
exports.rejectInvite = inviteFunctions.rejectInvite;
