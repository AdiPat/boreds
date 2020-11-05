import { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import firebase from "firebase/app";
import { boardsData } from "./boardsData";
import { DashDrawer } from "./DashDrawer";
import { BoardList } from "./BoardList";

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
    paddingRight: 0,
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
        <Grid container style={{ marginLeft: "10px", padding: "20px" }}>
          <Grid item xs={12} spacing={2}>
            <Typography variant="subtitle1">
              Welcome {props.user.email}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
        <Grid
          container
          alignItems="center"
          style={{ marginLeft: "10px", padding: "20px" }}
        >
          <Grid xs={12}>
            <Typography variant="h4">Your Boards</Typography>
          </Grid>
          <BoardList boardsList={boardsData}></BoardList>
        </Grid>
      </main>
    </div>
  );
}

export { Dashboard };
