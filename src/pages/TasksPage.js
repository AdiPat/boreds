/**
 * Component: TasksPage
 * Container component that calls TasksHome with user data.
 */

import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TasksHome } from "../tasks/TasksHome";
import AppContext from "../providers/AppContext";
import TasksProvider from "../providers/TasksProvider";

function TasksPage(props) {
  const context = useContext(AppContext);
  const [user, setUser] = useState(null);
  const taskId = props.match ? props.match.params.taskId : undefined;

  useEffect(() => {
    setUser(context.user);
  }, [context.user, user]);

  return (
    <TasksProvider user={user}>
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
