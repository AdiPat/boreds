import { SideMenuButton } from "./SideMenuButton";
import { useHistory } from "react-router";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import firebase from "firebase/app";

function LogoutButton({ openDrawer }) {
  const history = useHistory();

  const handleLogout = () => {
    firebase.auth().signOut();
    history.push("/login");
  };

  return (
    <SideMenuButton
      btnKey="Logout"
      text="Logout"
      icon={<ExitToAppIcon />}
      clickHandler={handleLogout}
      openDrawer={openDrawer}
    />
  );
}

export { LogoutButton };
