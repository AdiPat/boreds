import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AppDrawer } from "../components/drawer/AppDrawer";
import { TasksContent } from "./TasksContent";
import { TasksToolbar } from "./TasksToolbar";
import TasksContext from "../providers/TasksContext";
import { CircularLoader } from "../components/CircularLoader";

function TasksHome(props) {
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const context = useContext(TasksContext);

  useEffect(() => {
    if (props.user) {
      setUserId(props.user.uid);
      setIsLoggedIn(true);
      context.loadTasks();
    }
  }, [props.user]);

  return (
    <React.Fragment>
      <AppDrawer dashTitle="Tasks" userId={userId} />
      {isLoggedIn ? (
        <React.Fragment>
          <TasksToolbar title="Dummy Text" userId={userId} taskId="123" />
          <TasksContent userId={userId} />
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
