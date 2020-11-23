const updatePublicBoards = require("./updatePublicBoards");
const deleteBoardTrigger = require("./deleteBoardTrigger");
const updateBoardUserOnCreation = require("./updateBoardUserOnCreation");
const getPublicBoard = require("./getPublicBoard");

exports.updatePublicBoards = updatePublicBoards.func;
exports.deleteBoardTrigger = deleteBoardTrigger.func;
exports.updateBoardUserOnCreation = updateBoardUserOnCreation.func;
exports.getPublicBoard = getPublicBoard.func;
