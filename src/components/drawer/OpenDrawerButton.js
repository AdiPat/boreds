import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
}));

function OpenDrawerButton(props) {
  const classes = useStyles();

  return props.isLoggedIn ? (
    <IconButton
      color="inherit"
      aria-label="open drawer"
      onClick={props.handleDrawerOpen}
      edge="start"
      className={clsx(classes.menuButton, {
        [classes.hide]: props.openDrawer,
      })}
    >
      <MenuIcon />
    </IconButton>
  ) : null;
}

OpenDrawerButton.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  openDrawer: PropTypes.bool.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
};

OpenDrawerButton.defaultProps = {
  isLoggedIn: false,
};

export { OpenDrawerButton };
