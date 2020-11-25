import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, List, Divider } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

function SideMenu(props) {
  const classes = useStyles();
  const closeButton = props.closeButton;

  return props.isLoggedIn ? (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: props.openDrawer,
        [classes.drawerClose]: !props.openDrawer,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: props.openDrawer,
          [classes.drawerClose]: !props.openDrawer,
        }),
      }}
    >
      <div className={classes.toolbar}>{closeButton}</div>
      <Divider />
      <List>{props.children}</List>
    </Drawer>
  ) : null;
}

SideMenu.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  closeButton: PropTypes.node.isRequired,
  children: PropTypes.node,
};

SideMenu.defaultProps = {
  isLoggedIn: false,
};

export { SideMenu };
