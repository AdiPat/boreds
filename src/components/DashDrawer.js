import clsx from "clsx";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AccountBoxRounded from "@material-ui/icons/AccountBoxRounded";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import firebase from "firebase/app";
import { CreateBoardModal } from "./CreateBoardModal";
import {
  getAllInviteNotifications,
  getAllInvites,
  getInvitesCount,
} from "../services/invite";
import { getCurrentUser } from "../services/user";
import { NotificationsMenu } from "./NotificationsMenu";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
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

function DashDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
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

  const handleShowBoards = () => {
    history.push("/dashboard");
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

  const handleLogout = () => {
    firebase.auth().signOut();
    history.push("/login");
  };

  const handleProfileClick = () => {
    history.push("/profile");
  };

  return (
    <div>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openDrawer,
        })}
      >
        <Toolbar>
          {isLoggedIn ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: openDrawer,
              })}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          <Typography variant="h6" noWrap>
            Boreds {props.dashTitle}
          </Typography>
          {isLoggedIn ? (
            <IconButton
              color="inherit"
              style={{ marginLeft: "auto" }}
              onClick={openNotificationsMenu}
            >
              <Badge badgeContent={notificationsCount} color="secondary">
                <NotificationsRoundedIcon />
              </Badge>
            </IconButton>
          ) : null}
        </Toolbar>
      </AppBar>
      {isLoggedIn ? (
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: openDrawer,
            [classes.drawerClose]: !openDrawer,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: openDrawer,
              [classes.drawerClose]: !openDrawer,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button key="CreateBoard" onClick={handleOpenModal}>
              <ListItemIcon>
                <AddCircleRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Create Board" />
            </ListItem>
            <ListItem button key="Boards" onClick={handleShowBoards}>
              <ListItemIcon>
                <LibraryBooksIcon />
              </ListItemIcon>
              <ListItemText primary="Boards" />
            </ListItem>
            <ListItem button key="Profile" onClick={handleProfileClick}>
              <ListItemIcon>
                <AccountBoxRounded />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button key="Logout" onClick={handleLogout}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Drawer>
      ) : null}
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

export { DashDrawer };
