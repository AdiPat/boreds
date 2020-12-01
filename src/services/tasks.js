import firebase from "firebase";

const addTask = async (taskTitle, taskDescription) => {
  const _addTask = firebase.functions().httpsCallable("addTask");

  let successResponse = {
    status: true,
    msg: `Successfully added task ${taskTitle}`,
  };

  let failureResponse = {
    status: false,
    msg: "Failed to add task.",
  };

  return _addTask({ taskTitle, taskDescription })
    .then((result) => {
      return result.data.success ? successResponse : failureResponse;
    })
    .catch((err) => {
      console.log("addTask()", err);
      failureResponse.msg = err.message; // custom message
      return failureResponse;
    });
};

const getTasks = async () => {
  const _getTasks = firebase.functions().httpsCallable("getTasks");
  let response = {
    tasks: {},
    msg: "",
  };

  return _getTasks()
    .then((result) => {
      response.tasks = result.data.tasks;
      return response;
    })
    .catch((err) => {
      response.errorCode = err.code;
      response.msg = err.message;
      return response;
    });
};

const attachTaskStarListener = async (userId, taskId, updateStarInState) => {
  const database = firebase.database();
  const starRef = database.ref(`users/${userId}/tasks/${taskId}/starred`);
  starRef.on("value", function (snapshot) {
    const starred = snapshot.val() || false;
    updateStarInState(starred);
  });
};

const detachTaskStarListener = async (userId, taskId) => {
  const database = firebase.database();
  const starRef = database.ref(`users/${userId}/tasks/${taskId}/starred`);
  starRef.off("value");
};

const starTask = async (userId, taskId) => {
  const _setTaskStar = firebase.functions().httpsCallable("setTaskStar");

  return _setTaskStar({ taskId: taskId, starred: true })
    .then((result) => result.data.starred)
    .catch((err) => console.error(err));
};

const unstarTask = async (userId, taskId) => {
  const _setTaskStar = firebase.functions().httpsCallable("setTaskStar");

  return _setTaskStar({ taskId: taskId, starred: false })
    .then((result) => result.data.starred)
    .catch((err) => console.error(err));
};

export {
  addTask,
  getTasks,
  attachTaskStarListener,
  detachTaskStarListener,
  starTask,
  unstarTask,
};
