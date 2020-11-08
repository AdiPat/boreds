import { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Board from "react-trello";
import AppContext from "../providers/AppContext";

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
  const { state } = useContext(AppContext);

  const [curBoardData, setCurBoardData] = useState(
    state.boardsList[props.boardId]
  );

  return (
    <main className={classes.content}>
      {/* {renderBoardLists(props.boardLists)} */}
      <Board
        data={curBoardData}
        style={{ backgroundColor: "white" }}
        editable
        canAddLanes
        draggable
        onDataChange={(newData) => console.log(newData)}
      ></Board>
    </main>
  );
}

export { BoardContent };
