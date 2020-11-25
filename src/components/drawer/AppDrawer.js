import { useState } from "react";
import { NotificationsMenu } from "../NotificationsMenu";
import { DrawerAppBar } from "./DrawerAppBar";
import { DrawerAppBarTitle } from "./DrawerAppBarTitle";
import { SideMenu } from "./SideMenu";
import { CloseDrawerButton } from "./buttons/CloseDrawerButton";
import { AddBoardButton } from "./buttons/AddBoardButton";
import { DashButton } from "./buttons/DashButton";
import { ProfileButton } from "./buttons/ProfileButton";
import { LogoutButton } from "./buttons/LogoutButton";
import { OpenDrawerButton } from "./buttons/OpenDrawerButton";
import { DrawerNotificationsButton } from "./buttons/DrawerNotificationButton";

function AppDrawer(props) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(null);
  const [notificationsMenuAnchorEl, setNotificationsMenuAnchorEl] = useState(
    null
  );

  const isLoggedIn = props.userId != null;

  const openNotificationsMenu = (e) => {
    setNotificationsMenuAnchorEl(e.target);
  };

  const closeNotificationsMenu = () => {
    setNotificationsMenuAnchorEl(null);
  };

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
          openNotificationsMenu={openNotificationsMenu}
          notificationsCount={notificationsCount}
        />
      </DrawerAppBar>
      <SideMenu
        isLoggedIn={isLoggedIn}
        openDrawer={openDrawer}
        closeButton={
          <CloseDrawerButton handleDrawerClose={handleDrawerClose} />
        }
      >
        <AddBoardButton />
        <DashButton />
        <ProfileButton />
        <LogoutButton />
      </SideMenu>
      <NotificationsMenu
        anchorEl={notificationsMenuAnchorEl}
        handleClose={closeNotificationsMenu}
        setNotificationsCount={setNotificationsCount}
      />
    </div>
  );
}

export { AppDrawer };
