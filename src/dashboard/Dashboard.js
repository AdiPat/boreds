import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
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
  const [openDrawer, setOpenDrawer] = useState(false);
  const [boardsList, setBoardsList] = useState([]);

  useEffect(() => {
    setBoardsList(boardsData);
  });

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
          <BoardList boardsList={boardsList}></BoardList>
        </Grid>
      </main>
    </div>
  );
}

export { Dashboard };
