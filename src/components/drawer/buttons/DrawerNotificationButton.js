import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { IconButton, Badge } from "@material-ui/core";
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import { NotificationsMenu } from "../../menus/NotificationsMenu";
import { getReceivedInvitesCount } from "../../../services/invite";

function DrawerNotificationsButton(props) {
  const [notificationsMenuAnchorEl, setNotificationsMenuAnchorEl] = useState(
    null
  );
  const [notificationsCount, setNotificationsCount] = useState(0);

  useEffect(() => {
    getReceivedInvitesCount(props.userId)
      .then((invitesCount) => setNotificationsCount(invitesCount))
      .catch((err) => console.log(err.code, err.message));
  }, [notificationsCount]);

  const openNotificationsMenu = (e) => {
    setNotificationsMenuAnchorEl(e.target);
  };

  const closeNotificationsMenu = () => {
    setNotificationsMenuAnchorEl(null);
  };

  return props.isLoggedIn ? (
    <div style={{ marginLeft: "auto" }}>
      <IconButton
        color="inherit"
        style={{ marginLeft: "auto" }}
        onClick={openNotificationsMenu}
      >
        <Badge badgeContent={notificationsCount} color="secondary">
          <NotificationsRoundedIcon />
        </Badge>
      </IconButton>
      <NotificationsMenu
        anchorEl={notificationsMenuAnchorEl}
        handleClose={closeNotificationsMenu}
      />
    </div>
  ) : null;
}

DrawerNotificationsButton.propTypes = {
  userId: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export { DrawerNotificationsButton };
