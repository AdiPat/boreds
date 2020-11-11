import { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import { BoardList } from "./BoardList";
import AppContext from "../providers/AppContext";

const useStyles = makeStyles((theme) => ({
  dashItem: {
    display: "flex",
    alignItems: "center",
  },
  dashItemIcon: {
    color: "#616161",
  },
  dashItemTitle: {
    marginLeft: theme.spacing(1),
    //textTransform: "uppercase",
    color: "#616161",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(8),
    paddingRight: 0,
  },
}));

function DashContent(props) {
  const classes = useStyles();
  const { state, setBoardsList } = useContext(AppContext);
  const boardsList = state.boardsList;
  const starredBoards = Object.keys(boardsList)
    .filter((boardKey) => boardsList[boardKey].starred)
    .map((boardKey) => boardsList[boardKey]);

  return (
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
          <div className={classes.dashItem}>
            <LibraryBooksIcon className={classes.dashItemIcon} />
            <Typography className={classes.dashItemTitle} variant="h5">
              Starred Boards
            </Typography>
          </div>
        </Grid>
        <BoardList boardsList={starredBoards}></BoardList>
      </Grid>
      <Grid
        container
        alignItems="center"
        style={{ marginLeft: "10px", padding: "20px" }}
      >
        <Grid xs={12}>
          <div className={classes.dashItem}>
            <LibraryBooksIcon className={classes.dashItemIcon} />
            <Typography className={classes.dashItemTitle} variant="h5">
              Your Boards
            </Typography>
          </div>
        </Grid>
        <BoardList boardsList={boardsList}></BoardList>
      </Grid>
    </main>
  );
}

export { DashContent };
