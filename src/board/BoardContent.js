import { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Board from "react-trello";
import AppContext from "../providers/AppContext";
import { CircularLoader } from "../components/CircularLoader";
import "firebase/database";
import { padEmptyLanes, updateBoardData } from "../services/board";

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
        props.setIsBoardStarred(Boolean(paddedData.starred));
      }
    }
  };

  useEffect(() => {
    _loadCurBoard();
  });

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
