import { useState } from "react";
import { CreateBoardModal } from "../CreateBoardModal";
import { NotificationsMenu } from "../NotificationsMenu";
import { DrawerAppBar } from "./DrawerAppBar";
import { OpenDrawerButton } from "./OpenDrawerButton";
import { DrawerNotificationsButton } from "./DrawerNotificationButton";
import { DrawerAppBarTitle } from "./DrawerAppBarTitle";
import { SideMenu } from "./SideMenu";
import { CloseDrawerButton } from "./CloseDrawerButton";
import { AddBoardButton } from "./AddBoardButton";
import { DashButton } from "./DashButton";
import { ProfileButton } from "./ProfileButton";
import { LogoutButton } from "./LogoutButton";

function AppDrawer(props) {
  const [openModal, setOpenModal] = useState(false);
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

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
        <AddBoardButton openModal={handleOpenModal} />
        <DashButton />
        <ProfileButton />
        <LogoutButton />
      </SideMenu>
      <CreateBoardModal
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        openModal={openModal}
      ></CreateBoardModal>
      <NotificationsMenu
        anchorEl={notificationsMenuAnchorEl}
        handleClose={closeNotificationsMenu}
        setNotificationsCount={setNotificationsCount}
      />
    </div>
  );
}

export { AppDrawer };
