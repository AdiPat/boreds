import { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Board from "react-trello";
import AppContext from "../providers/AppContext";
import firebase from "firebase/app";
import { CircularLoader } from "../components/CircularLoader";
import { BoardToolbar } from "./BoardToolbar";
import "firebase/database";
import {
  padEmptyLanes,
  updateBoardData,
  isBoardPublic,
} from "../services/board";
import { attachBoardUpdateListener } from "../services/database";

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    paddingRight: 0,
    paddingLeft: 0,
    marginLeft: theme.spacing(11),
    marginTop: theme.spacing(21),
    alignItems: "flex-start",
    ["@media (max-width: 400px)"]: {
      marginLeft: theme.spacing(7),
    },
  },
  contentPublic: {
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

function BoardContent(props) {
  const classes = useStyles();
  const { state } = useContext(AppContext);
  const user = state.user;
  const isLoggedIn = user != null;

  const [curBoardData, setCurBoardData] = useState(null);

  // only for public boards viewed when user is not logged in
  const _updateCurBoard = (boardId, boardData) => {
    console.log("_updateCurBoard()");
    let paddedData = padEmptyLanes(boardData);
    if (paddedData) {
      setCurBoardData(paddedData);
      props.setIsBoardPublic(true);
      props.setBoardLoaded(true);
    }
  };

  const _loadCurBoard = async () => {
    let data = state.boardsList[props.boardId];
    if (data) {
      // data is loaded in AppProvider
      props.setBoardTitle(data.title);
      console.log("BoardContent.useEffect: ", data);
      let paddedData = padEmptyLanes(data);
      console.log(`Board Data: boardId=${props.boardId}`, paddedData);
      if (paddedData) {
        setCurBoardData(paddedData);
        props.setIsBoardPublic(Boolean(paddedData.public));
        props.setIsBoardStarred(Boolean(paddedData.starred));
        props.setBoardLoaded(true);
      }
    } else if (data == null && !isLoggedIn) {
      // handle public board
      let publicStatus = await isBoardPublic(props.boardId);
      console.log("publicStatus: ", publicStatus, props.boardId);
      if (publicStatus) {
        attachBoardUpdateListener(props.boardId, _updateCurBoard);
      }
    }
  };

  useEffect(() => {
    _loadCurBoard();
  }, []);

  const handleCardAdd = (card, laneId) => {
    console.log("Added ", card, " to ", laneId);
  };

  console.log("BoardContent: ", curBoardData);

  const handleDataChange = (newData) => {
    console.log("handleDataChange: ", newData);
    if (isLoggedIn) {
      const userId = user != null ? user.uid : null;
      updateBoardData(userId, props.boardId, newData);
    }
  };

  return curBoardData == null ? (
    <CircularLoader color="secondary" />
  ) : (
    <main className={isLoggedIn ? classes.content : classes.contentPublic}>
      <Board
        data={curBoardData}
        style={{ backgroundColor: "white" }}
        editable={isLoggedIn}
        canAddLanes
        draggable
        onDataChange={handleDataChange}
        onCardAdd={handleCardAdd}
      ></Board>
    </main>
  );
}

export { BoardContent };
