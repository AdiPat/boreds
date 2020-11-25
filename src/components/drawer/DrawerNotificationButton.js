import PropTypes from "prop-types";
import { IconButton, Badge } from "@material-ui/core";
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";

function DrawerNotificationsButton(props) {
  return props.isLoggedIn ? (
    <IconButton
      color="inherit"
      style={{ marginLeft: "auto" }}
      onClick={props.openNotificationsMenu}
    >
      <Badge badgeContent={props.notificationsCount} color="secondary">
        <NotificationsRoundedIcon />
      </Badge>
    </IconButton>
  ) : null;
}

DrawerNotificationsButton.propTypes = {
  openNotificationsMenu: PropTypes.func.isRequired,
  notificationsCount: PropTypes.number.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export { DrawerNotificationsButton };
