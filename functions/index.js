const functions = require("firebase-functions");
const admin = require("firebase-admin");
const boardFunctions = require("./board/index");

admin.initializeApp();

exports.updatePublicBoards = boardFunctions.updatePublicBoards;
exports.deleteBoardTrigger = boardFunctions.deleteBoardTrigger;
