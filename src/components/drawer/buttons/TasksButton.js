import { useHistory } from "react-router";
import { SideMenuButton } from "./SideMenuButton";
import ListIcon from "@material-ui/icons/List";

function TasksButton({ openDrawer }) {
  const history = useHistory();

  const handleTasksRedirect = () => {
    history.push("/tasks");
  };

  return (
    <SideMenuButton
      btnKey="Tasks"
      text="Tasks"
      icon={<ListIcon />}
      clickHandler={handleTasksRedirect}
      openDrawer={openDrawer}
    />
  );
}

export { TasksButton };
