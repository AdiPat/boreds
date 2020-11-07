import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { BoardListCard } from "./BoardListCard";

const useStyles = makeStyles((theme) => ({
  boardList: {
    width: 272,
    margin: theme.spacing(0, 1),
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ebecf0",
    borderRadius: 5,
  },
  boardListTitle: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
    paddingBottom: 0,
  },
  boardListContainer: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1),
  },
}));

function BoardList(props) {
  const classes = useStyles();

  const renderBoardListCards = (listCards) => {
    return listCards.map((listCard) => <BoardListCard cardText={listCard} />);
  };

  return (
    <div className={classes.boardList}>
      <div className={classes.boardListTitle}>
        <Typography variant="h6">{props.title}</Typography>
      </div>

      <div className={classes.boardListContainer}>
        {renderBoardListCards(props.cards)}
      </div>
    </div>
  );
}

export { BoardList };
