const functions = require("firebase-functions");
const admin = require("firebase-admin");
const boardFunctions = require("./board/index");
const inviteFunctions = require("./invite/index");

admin.initializeApp();

// board functions
exports.updatePublicBoards = boardFunctions.updatePublicBoards;
exports.deleteBoardTrigger = boardFunctions.deleteBoardTrigger;
exports.updateBoardUserOnCreation = boardFunctions.updateBoardUserOnCreation;

// invite functions
exports.checkDuplicateInvite = inviteFunctions.checkDuplicateInvite;
