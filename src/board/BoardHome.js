import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { DashDrawer } from "../components/DashDrawer";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(8),
    paddingRight: 0,
  },
}));

function BoardHome(props) {
  const classes = useStyles();

  return (
    <div>
      <DashDrawer />
      <main className={classes.content}>
        <Grid container style={{ marginLeft: "10px", padding: "20px" }}>
          <Grid item xs={12}>
            <Typography variant="h3">
              Welcome boardId = {props.boardId}
            </Typography>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

export { BoardHome };
