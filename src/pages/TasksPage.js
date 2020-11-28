/**
 * Component: TasksPage
 * Container component that calls TasksHome with user data.
 */

import { useContext } from "react";
import { TasksHome } from "../tasks/TasksHome";
import AppContext from "../providers/AppContext";

function TasksPage() {
  const { state } = useContext(AppContext);
  const user = state.user;

  return <TasksHome user={user} />;
}

export { TasksPage };
