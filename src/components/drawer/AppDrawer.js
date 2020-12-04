import { useState } from "react";
import PropTypes from "prop-types";
import { DrawerAppBar } from "./DrawerAppBar";
import { DrawerAppBarTitle } from "./DrawerAppBarTitle";
import { SideMenu } from "./SideMenu";
import { CloseDrawerButton } from "./buttons/CloseDrawerButton";
import { AddBoardButton } from "./buttons/AddBoardButton";
import { DashButton } from "./buttons/DashButton";
import { ProfileButton } from "./buttons/ProfileButton";
import { LogoutButton } from "./buttons/LogoutButton";
import { OpenDrawerButton } from "./buttons/OpenDrawerButton";
import { CalendarButton } from "./buttons/CalendarButton";
import { DrawerNotificationsButton } from "./buttons/DrawerNotificationButton";
import { TasksButton } from "./buttons/TasksButton";
import { GeneralAddButton } from "./buttons/GeneralAddButton";

function AppDrawer(props) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const isLoggedIn = props.userId != null;

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <div>
      <DrawerAppBar isDrawerOpen={openDrawer}>
        <OpenDrawerButton
          handleDrawerOpen={handleDrawerOpen}
          isLoggedIn={isLoggedIn}
          openDrawer={openDrawer}
        />
        <DrawerAppBarTitle dashTitle={props.dashTitle} />
        <DrawerNotificationsButton
          isLoggedIn={isLoggedIn}
          userId={props.userId}
        />
      </DrawerAppBar>
      <SideMenu
        isLoggedIn={isLoggedIn}
        openDrawer={openDrawer}
        closeButton={
          <CloseDrawerButton handleDrawerClose={handleDrawerClose} />
        }
      >
        <GeneralAddButton />
        <DashButton />
        <TasksButton />
        <CalendarButton />
        <ProfileButton />
        <LogoutButton />
      </SideMenu>
    </div>
  );
}

AppDrawer.propTypes = {
  dashTitle: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

AppDrawer.defaultProps = {
  dashTitle: "",
  userId: undefined,
};

export { AppDrawer };
