import firebase from "firebase/app";

const addTaskActivity = async (taskId, activityText, position) => {
  const _addTaskActivity = firebase
    .functions()
    .httpsCallable("addTaskActivity");

  return _addTaskActivity({ taskId, activityText, position })
    .then((result) => ({
      status: result.data.status,
    }))
    .catch((err) => {
      console.log(err);
      return {
        status: false,
        message: err.message,
      };
    });
};

const attachTasksActivitiesListener = async (
  taskId,
  updateActivitiesInState
) => {
  const database = firebase.database();
  const taskActivitiesRef = database.ref(`tasks/${taskId}/activities`);
  taskActivitiesRef.on("value", (snapshot) => {
    const activities = snapshot.val();
    console.log("listener: ", activities);
    if (activities) {
      updateActivitiesInState(activities);
    }
  });
};

const detachTasksActivitiesListener = async (taskId) => {
  const database = firebase.database();
  const taskActivitiesRef = database.ref(`tasks/${taskId}/activities`);
  taskActivitiesRef.off("value");
};

const deleteTaskActivity = async (taskId, activityId) => {
  // TODO:
  return false;
};

export {
  addTaskActivity,
  attachTasksActivitiesListener,
  detachTasksActivitiesListener,
  deleteTaskActivity,
};
