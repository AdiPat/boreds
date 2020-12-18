const admin = require("firebase-admin");
const userFunctions = require("./user/index");
const boardFunctions = require("./board/index");
const inviteFunctions = require("./invite/index");
const taskFunctions = require("./tasks/index");
const calendarFunctions = require("./calendar/index");

admin.initializeApp();

// user functions
exports.userCreateTrigger = userFunctions.userCreateTrigger;

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
exports.createTaskInvite = inviteFunctions.createTaskInvite;

// tasks functions
exports.addTask = taskFunctions.addTask;
exports.deleteTask = taskFunctions.deleteTask;
exports.addTaskTrigger = taskFunctions.addTaskTrigger;
exports.deleteTaskTrigger = taskFunctions.deleteTaskTrigger;
exports.flipTaskStar = taskFunctions.flipTaskStar;
exports.setTaskVisibility = taskFunctions.setTaskVisibility;
exports.getTask = taskFunctions.getTask;
exports.editTaskTitle = taskFunctions.editTaskTitle;
exports.editTaskDescription = taskFunctions.editTaskDescription;
exports.setTaskPriority = taskFunctions.setTaskPriority;
exports.getTaskPriority = taskFunctions.getTaskPriority;
exports.getTaskStar = taskFunctions.getTaskStar;
exports.setTaskStar = taskFunctions.setTaskStar;
exports.getTasks = taskFunctions.getTasks;
exports.addTaskActivity = taskFunctions.addTaskActivity;
exports.deleteTaskActivity = taskFunctions.deleteTaskActivity;
exports.setActivityPriority = taskFunctions.setActivityPriority;
exports.getTaskVisibility = taskFunctions.getTaskVisibility;

// calendar functions
exports.addCalendarEvent = calendarFunctions.addCalendarEvent;
exports.updateCalendarEvent = calendarFunctions.updateCalendarEvent;
exports.deleteCalendarEvent = calendarFunctions.deleteCalendarEvent;
