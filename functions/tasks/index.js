const addTask = require("./addTask");
const addTaskTrigger = require("./addTaskTrigger");
const deleteTask = require("./deleteTask");
const deleteTaskTrigger = require("./deleteTaskTrigger");
const flipTaskStar = require("./flipTaskStar");
const setTaskVisibility = require("./setTaskVisibility");
const getTask = require("./getTask");
const editTaskTitle = require("./editTaskTitle");
const editTaskDescription = require("./editTaskDescription");
const setTaskPriority = require("./setTaskPriority");
const getTaskPriority = require("./getTaskPriority");
const getTaskStar = require("./getTaskStar");

exports.addTask = addTask.func;
exports.deleteTask = deleteTask.func;
exports.addTaskTrigger = addTaskTrigger.func;
exports.deleteTaskTrigger = deleteTaskTrigger.func;
exports.flipTaskStar = flipTaskStar.func;
exports.setTaskVisibility = setTaskVisibility.func;
exports.getTask = getTask.func;
exports.editTaskTitle = editTaskTitle.func;
exports.editTaskDescription = editTaskDescription.func;
exports.setTaskPriority = setTaskPriority.func;
exports.getTaskPriority = getTaskPriority.func;
exports.getTaskStar = getTaskStar.func;
