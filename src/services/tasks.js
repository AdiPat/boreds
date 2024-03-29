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

const deleteTask = async (taskId) => {
  const _deleteTask = firebase.functions().httpsCallable("deleteTask");
  return _deleteTask({ taskId })
    .then((result) => result.data.success)
    .catch((err) => {
      console.error(err);
      return false;
    });
};

const attachTaskTitleListener = async (taskId, updateTitleInState) => {
  const database = firebase.database();
  const taskTitleRef = database.ref(`tasks/${taskId}/title`);
  taskTitleRef.on("value", function (snapshot) {
    const title = snapshot.val();
    updateTitleInState(title);
  });
};

const detachTaskTitleListener = async (taskId) => {
  const database = firebase.database();
  const taskTitleRef = database.ref(`tasks/${taskId}/title`);
  taskTitleRef.off("value");
};

const attachTaskDescriptionListener = async (taskId, updateTitleInState) => {
  const database = firebase.database();
  const taskTitleRef = database.ref(`tasks/${taskId}/description`);
  taskTitleRef.on("value", function (snapshot) {
    const title = snapshot.val();
    updateTitleInState(title);
  });
};

const detachTaskDescriptionListener = async (taskId) => {
  const database = firebase.database();
  const taskTitleRef = database.ref(`tasks/${taskId}/description`);
  taskTitleRef.off("value");
};

const attachTasksListener = async (userId, updateTasksInState) => {
  const database = firebase.database();
  const userTasksRef = database.ref(`users/${userId}/tasks`);
  return userTasksRef.on("value", function (snapshot) {
    const tasks = snapshot.val();
    updateTasksInState(tasks, userTasksRef);
  });
};

const detachTasksListener = async (userTasksRef) => {
  userTasksRef.off("value");
};

const attachTaskVisibilityListener = async (
  taskId,
  updateVisibilityInState
) => {
  const database = firebase.database();
  const taskVisibilityRef = database.ref(`tasks/${taskId}/public`);
  taskVisibilityRef.on("value", function (snapshot) {
    const publicStatus = snapshot.val();
    updateVisibilityInState(publicStatus, taskVisibilityRef);
  });
};

const detachTaskVisibilityListener = async (taskVisibilityRef) => {
  taskVisibilityRef.off("value");
};

const setTaskVisibility = async (taskId, visibility) => {
  const _setTaskVisibility = firebase
    .functions()
    .httpsCallable("setTaskVisibility");

  return _setTaskVisibility({ taskId, visibility })
    .then((result) => result.data.status)
    .catch((err) => {
      console.error("setTaskVisibility(): ", err.message, err.code);
      return false;
    });
};

const isTaskPublic = async (taskId) => {
  const _getTaskVisibility = firebase
    .functions()
    .httpsCallable("getTaskVisibility");

  return _getTaskVisibility({ taskId })
    .then((result) => result.data.visibility == "public")
    .catch((err) => {
      console.error("Failed to get task visibility", err.code, err.message);
      return false; // default false
    });
};

export {
  addTask,
  getTasks,
  attachTaskStarListener,
  detachTaskStarListener,
  starTask,
  unstarTask,
  deleteTask,
  attachTaskTitleListener,
  detachTaskTitleListener,
  attachTaskDescriptionListener,
  detachTaskDescriptionListener,
  attachTasksListener,
  detachTasksListener,
  attachTaskVisibilityListener,
  detachTaskVisibilityListener,
  setTaskVisibility,
  isTaskPublic,
};
