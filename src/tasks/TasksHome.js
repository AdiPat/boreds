import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AppDrawer } from "../components/drawer/AppDrawer";
import { TasksContent } from "./TasksContent";
import { TasksToolbar } from "./TasksToolbar";
import TasksContext from "../providers/TasksContext";
import { CircularLoader } from "../components/CircularLoader";
import {
  attachTaskVisibilityListener,
  detachTaskVisibilityListener,
} from "../services/tasks";

function TasksHome(props) {
  const context = useContext(TasksContext);
  const [userId, setUserId] = useState(undefined);
  const [taskId, setTaskId] = useState(undefined);
  const [visibilityRef, setVisibilityRef] = useState(null);
  const [isPublic, setIsPublic] = useState(false);

  const updateVisibility = (publicVal, ref) => {
    setVisibilityRef(ref);
    setIsPublic(publicVal);
  };

  useEffect(() => {
    const uid = context.state.user ? context.state.user.uid : null;
    if (!visibilityRef) {
      attachTaskVisibilityListener(props.taskId, updateVisibility);
    }
    setUserId(uid);
    setTaskId(props.taskId);

    function cleanup() {
      if (visibilityRef) {
        detachTaskVisibilityListener(visibilityRef);
      }
    }
  }, [
    context.state.userLoaded,
    context.state.user,
    props.taskId,
    taskId,
    visibilityRef,
    isPublic,
  ]);

  return (
    <React.Fragment>
      <AppDrawer dashTitle="Tasks" userId={userId} />
      {context.state.userLoaded || isPublic ? (
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
  user: PropTypes.string,
  taskId: PropTypes.string,
};

TasksHome.defaultProps = {
  user: null,
  taskId: undefined,
};

export { TasksHome };
