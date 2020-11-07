import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    paddingRight: 0,
    paddingLeft: 0,
    marginLeft: theme.spacing(10),
    marginTop: theme.spacing(10),
  },
}));

function BoardContent(props) {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <h1>Sample Text</h1>
    </main>
  );
}

export { BoardContent };
