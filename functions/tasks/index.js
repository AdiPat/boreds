const addTask = require("./addTask");
const addTaskTrigger = require("./addTaskTrigger");
const deleteTask = require("./deleteTask");
const deleteTaskTrigger = require("./deleteTaskTrigger");

exports.addTask = addTask.func;
exports.deleteTask = deleteTask.func;
exports.addTaskTrigger = addTaskTrigger.func;
exports.deleteTaskTrigger = deleteTaskTrigger.func;
