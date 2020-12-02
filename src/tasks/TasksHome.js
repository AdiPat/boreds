import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AppDrawer } from "../components/drawer/AppDrawer";
import { TasksContent } from "./TasksContent";
import { TasksToolbar } from "./TasksToolbar";
import TasksContext from "../providers/TasksContext";
import { CircularLoader } from "../components/CircularLoader";

function TasksHome(props) {
  const context = useContext(TasksContext);
  const [userId, setUserId] = useState(undefined);
  const [taskId, setTaskId] = useState(undefined);

  useEffect(() => {
    const uid = context.state.user ? context.state.user.uid : null;
    setUserId(uid);
    setTaskId(props.taskId);
  }, [context.state.loaded, context.state.user, props.taskId, taskId]);

  return (
    <React.Fragment>
      <AppDrawer dashTitle="Tasks" userId={userId} />
      {context.state.loaded ? (
        <React.Fragment>
          <TasksToolbar userId={userId} taskId={taskId} />
          <TasksContent userId={userId} taskId={taskId} />
        </React.Fragment>
      ) : (
        <CircularLoader color="secondary" />
      )}
    </React.Fragment>
  );
}

TasksHome.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.object.isRequired, // authenticated user
    PropTypes.oneOf([null]).isRequired, // public task
  ]).isRequired,
};

export { TasksHome };
