import { useHistory } from "react-router";
import { SideMenuButton } from "./SideMenuButton";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";

function DashButton({ openDrawer }) {
  const history = useHistory();

  const handleShowBoards = () => {
    history.push("/dashboard");
  };

  return (
    <SideMenuButton
      btnKey="OpenDash"
      text="All Boards"
      icon={<LibraryBooksIcon />}
      clickHandler={handleShowBoards}
      openDrawer={openDrawer}
    />
  );
}

export { DashButton };
