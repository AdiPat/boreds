const updatePublicBoards = require("./updatePublicBoards");
const deleteBoardTrigger = require("./deleteBoardTrigger");
const updateBoardUserOnCreation = require("./updateBoardUserOnCreation");
const getPublicBoard = require("./getPublicBoard");
const updateBoardLanes = require("./updateBoardLanes");
const addNewBoard = require("./addNewBoard");

exports.updatePublicBoards = updatePublicBoards.func;
exports.deleteBoardTrigger = deleteBoardTrigger.func;
exports.updateBoardUserOnCreation = updateBoardUserOnCreation.func;
exports.getPublicBoard = getPublicBoard.func;
exports.updateBoardLanes = updateBoardLanes.func;
exports.addNewBoard = addNewBoard.func;
