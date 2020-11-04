import { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import firebase from "firebase/app";
import { DashDrawer } from "./DashDrawer";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(8),
  },
}));

function Dashboard(props) {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleLogout = () => {
    firebase.auth().signOut();
    history.push("/login");
  };

  return (
    <div>
      <DashDrawer
        openDrawer={openDrawer}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        handleLogout={handleLogout}
      ></DashDrawer>
      <main className={classes.content}>
        <Grid container style={{ marginLeft: "10px" }}>
          <Grid item xs={12} className={classes.toolbar}>
            <h1>Welcome {props.user.email}</h1>
          </Grid>
          <Grid item xs={12} className={classes.toolbar}>
            <Button type="contained" color="primary" onClick={handleLogout}>
              Logout
            </Button>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

export { Dashboard };
