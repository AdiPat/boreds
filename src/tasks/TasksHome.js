import React from "react";
import PropTypes from "prop-types";
import { AppDrawer } from "../components/drawer/AppDrawer";
import { TasksContent } from "./TasksContent";
import { TasksToolbar } from "./TasksToolbar";

function TasksHome(props) {
  const userId = props.user ? props.user.uid : null;

  return (
    <React.Fragment>
      <AppDrawer dashTitle="Tasks" userId={userId} />
      <TasksToolbar title="Dummy Text" userId={userId} taskId="123" />
      <TasksContent userId={userId} />
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
