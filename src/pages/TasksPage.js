/**
 * Component: TasksPage
 * Container component that calls TasksHome with user data.
 */

import { useContext } from "react";
import { TasksHome } from "../tasks/TasksHome";
import AppContext from "../providers/AppContext";
import TasksProvider from "../providers/TasksProvider";

function TasksPage() {
  const { state } = useContext(AppContext);
  const user = state.user;

  return (
    <TasksProvider>
      <TasksHome user={user} />
    </TasksProvider>
  );
}

export { TasksPage };
