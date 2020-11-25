import { useHistory } from "react-router";
import { SideMenuButton } from "./SideMenuButton";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";

function DashButton() {
  const history = useHistory();

  const handleShowBoards = () => {
    history.push("/dashboard");
  };

  return (
    <SideMenuButton
      key="OpenDash"
      text="All Boards"
      icon={<LibraryBooksIcon />}
      clickHandler={handleShowBoards}
    />
  );
}

export { DashButton };
