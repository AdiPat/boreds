import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { BoardList } from "./BoardList";

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    paddingRight: 0,
    paddingLeft: 0,
    marginLeft: theme.spacing(10),
    marginTop: theme.spacing(10),
    alignItems: "flex-start",
  },
}));

function BoardContent(props) {
  const classes = useStyles();

  const renderBoardLists = (lists) => {
    return lists.map((list) => (
      <BoardList title={list.title} cards={list.cards} />
    ));
  };

  return (
    <main className={classes.content}>
      {renderBoardLists(props.boardLists)}
    </main>
  );
}

export { BoardContent };
