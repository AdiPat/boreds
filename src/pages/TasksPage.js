/**
 * Component: TasksPage
 * Container component that calls TasksHome with user data.
 */

import { useContext } from "react";
import PropTypes from "prop-types";
import { TasksHome } from "../tasks/TasksHome";
import AppContext from "../providers/AppContext";
import TasksProvider from "../providers/TasksProvider";

function TasksPage(props) {
  const { state } = useContext(AppContext);
  const user = state.user;
  const taskId = props.match ? props.match.params.taskId : undefined;

  return (
    <TasksProvider>
      <TasksHome user={user} taskId={taskId} />
    </TasksProvider>
  );
}

TasksPage.propTypes = {
  taskId: PropTypes.string,
};

TasksPage.defaultProps = {
  taskId: undefined,
};

export { TasksPage };
