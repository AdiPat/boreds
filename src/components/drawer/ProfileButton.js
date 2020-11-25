import { SideMenuButton } from "./SideMenuButton";
import { useHistory } from "react-router";
import AccountBoxRounded from "@material-ui/icons/AccountBoxRounded";

function ProfileButton() {
  const history = useHistory();

  const handleProfileClick = () => {
    history.push("/profile");
  };

  return (
    <SideMenuButton
      key="OpenProfile"
      text="Profile"
      icon={<AccountBoxRounded />}
      clickHandler={handleProfileClick}
    />
  );
}

export { ProfileButton };
