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

export { addTaskActivity };
