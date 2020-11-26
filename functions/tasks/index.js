const addTask = require("./addTask");
const addTaskTrigger = require("./addTaskTrigger");
const deleteTask = require("./deleteTask");

exports.addTask = addTask.func;
exports.deleteTask = deleteTask.func;
exports.addTaskTrigger = addTaskTrigger.func;
