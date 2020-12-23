import { SideMenuButton } from "./SideMenuButton";
import { useHistory } from "react-router";
import AccountBoxRounded from "@material-ui/icons/AccountBoxRounded";

function ProfileButton({ openDrawer }) {
  const history = useHistory();

  const handleProfileClick = () => {
    history.push("/profile");
  };

  return (
    <SideMenuButton
      btnKey="OpenProfile"
      text="Profile"
      icon={<AccountBoxRounded />}
      clickHandler={handleProfileClick}
      openDrawer={openDrawer}
    />
  );
}

export { ProfileButton };
