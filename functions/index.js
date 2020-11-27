const admin = require("firebase-admin");
const boardFunctions = require("./board/index");
const inviteFunctions = require("./invite/index");
const taskFunctions = require("./tasks/index");

admin.initializeApp();

// board functions
exports.updatePublicBoards = boardFunctions.updatePublicBoards;
exports.deleteBoardTrigger = boardFunctions.deleteBoardTrigger;
exports.updateBoardUserOnCreation = boardFunctions.updateBoardUserOnCreation;
exports.getPublicBoard = boardFunctions.getPublicBoard;
exports.updateBoardLanes = boardFunctions.updateBoardLanes;
exports.addNewBoard = boardFunctions.addNewBoard;
exports.boardExists = boardFunctions.boardExists;

// invite functions
exports.checkDuplicateInvite = inviteFunctions.checkDuplicateInvite;
exports.inviteCreateTrigger = inviteFunctions.inviteCreateTrigger;
exports.getAllReceivedInvites = inviteFunctions.getAllReceivedInvites;
exports.createInvite = inviteFunctions.createInvite;
exports.acceptInvite = inviteFunctions.acceptInvite;
exports.rejectInvite = inviteFunctions.rejectInvite;

// tasks functions
exports.addTask = taskFunctions.addTask;
exports.deleteTask = taskFunctions.deleteTask;
exports.addTaskTrigger = taskFunctions.addTaskTrigger;
exports.deleteTaskTrigger = taskFunctions.deleteTaskTrigger;
exports.flipTaskStar = taskFunctions.flipTaskStar;
exports.setTaskVisibility = taskFunctions.setTaskVisibility;
exports.getTask = taskFunctions.getTask;
