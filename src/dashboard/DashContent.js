import { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import StarIcon from "@material-ui/icons/Star";
import { BoardList } from "./BoardList";
import { DashPane } from "./DashPane";
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
      <DashPane
        paneTitle="Starred Boards"
        icon={<StarIcon />}
        paneBoards={starredBoards}
      />
      <DashPane
        paneTitle="All Boards"
        icon={<LibraryBooksIcon />}
        paneBoards={boardsList}
      />
    </main>
  );
}

export { DashContent };
