import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularLoader } from "../components/CircularLoader";
import Board from "react-trello";
import { padEmptyLanes, isBoardPublic } from "../services/board";
import { attachBoardUpdateListener } from "../services/database";

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    paddingRight: 0,
    paddingLeft: 0,
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(10),
    alignItems: "flex-start",
    ["@media (max-width: 400px)"]: {
      marginLeft: theme.spacing(7),
    },
  },
}));

function PublicBoardContent(props) {
  const classes = useStyles();

  const [curBoardData, setCurBoardData] = useState(null);

  // only for public boards viewed when user is not logged in
  const _updateCurBoard = (boardId, boardData) => {
    console.log("_updateCurBoard()");
    let paddedData = padEmptyLanes(boardData);
    if (paddedData) {
      setCurBoardData(paddedData);
      props.setBoardTitle(paddedData.title);
      props.setBoardLoaded(true);
    }
  };

  const _loadCurBoard = async () => {
    attachBoardUpdateListener(props.boardId, _updateCurBoard);
  };

  useEffect(() => {
    _loadCurBoard();
  }, []);

  return (
    <main className={classes.content}>
      {curBoardData == null ? (
        <CircularLoader color="secondary" />
      ) : (
        <Board
          data={curBoardData}
          style={{ backgroundColor: "white" }}
          editable={false}
          cardDraggable={false}
          laneDraggable={false}
          hideCardDeleteIcon={true}
        ></Board>
      )}
    </main>
  );
}

export { PublicBoardContent };
