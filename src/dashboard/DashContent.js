import { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { BoardList } from "./BoardList";
import AppContext from "../providers/AppContext";

const useStyles = makeStyles((theme) => ({
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
          <Typography variant="h4">Your Boards</Typography>
        </Grid>
        <BoardList boardsList={boardsList}></BoardList>
      </Grid>
    </main>
  );
}

export { DashContent };
