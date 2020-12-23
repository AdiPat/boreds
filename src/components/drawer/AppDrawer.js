import { useState } from "react";
import PropTypes from "prop-types";
import { DrawerAppBar } from "./DrawerAppBar";
import { DrawerAppBarTitle } from "./DrawerAppBarTitle";
import { SideMenu } from "./SideMenu";
import { CloseDrawerButton } from "./buttons/CloseDrawerButton";
import { DashButton } from "./buttons/DashButton";
import { ProfileButton } from "./buttons/ProfileButton";
import { LogoutButton } from "./buttons/LogoutButton";
import { OpenDrawerButton } from "./buttons/OpenDrawerButton";
import { CalendarButton } from "./buttons/CalendarButton";
import { DrawerNotificationsButton } from "./buttons/DrawerNotificationButton";
import { TasksButton } from "./buttons/TasksButton";
import { TablesButton } from "./buttons/TablesButton";
import { GeneralAddButton } from "./buttons/GeneralAddButton";

function AppDrawer(props) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const isLoggedIn = props.userId != null;
  const hasTopButtons = props.topButtons !== null;

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
        {props.topButtons}
        <DrawerNotificationsButton
          isLoggedIn={isLoggedIn}
          userId={props.userId}
          hasTopButtons={hasTopButtons}
        />
      </DrawerAppBar>
      <SideMenu
        isLoggedIn={isLoggedIn}
        openDrawer={openDrawer}
        closeButton={
          <CloseDrawerButton handleDrawerClose={handleDrawerClose} />
        }
      >
        <GeneralAddButton openDrawer={openDrawer} />
        <DashButton openDrawer={openDrawer} />
        <TasksButton openDrawer={openDrawer} />
        <CalendarButton openDrawer={openDrawer} />
        <TablesButton openDrawer={openDrawer} />
        <ProfileButton openDrawer={openDrawer} />
        <LogoutButton openDrawer={openDrawer} />
      </SideMenu>
    </div>
  );
}

AppDrawer.propTypes = {
  dashTitle: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  topButtons: PropTypes.array,
};

AppDrawer.defaultProps = {
  dashTitle: "",
  userId: undefined,
  topButtons: null,
};

export { AppDrawer };
