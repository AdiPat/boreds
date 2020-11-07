import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  boardListCard: {
    backgroundColor: "white",
    padding: theme.spacing(1),
    borderRadius: 3,
    marginBottom: theme.spacing(1),
  },
}));

function BoardListCard(props) {
  const classes = useStyles();

  return (
    <div className={classes.boardListCard}>
      <Typography variant="subtitle1">{props.cardText}</Typography>
    </div>
  );
}

export { BoardListCard };
