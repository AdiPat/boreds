import { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Board from "react-trello";
import AppContext from "../providers/AppContext";
import firebase from "firebase/app";
import { CircularLoader } from "../components/CircularLoader";
import "firebase/database";
import { padEmptyLanes } from "../services/board";

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
  const user = state.user;

  const [curBoardData, setCurBoardData] = useState(null);

  useEffect(() => {
    let data = state.boardsList[props.boardId];
    if (data) {
      props.setBoardTitle(" - " + data.title);
      console.log("BoardContent.useEffect: ", data);
      let paddedData = padEmptyLanes(data);
      console.log(`Board Data: boardId=${props.boardId}`, paddedData);
      if (paddedData) {
        setCurBoardData(paddedData);
      }
    }
  });

  const handleCardAdd = (card, laneId) => {
    console.log("Added ", card, " to ", laneId);
  };

  console.log("BoardContent: ", curBoardData);

  const handleDataChange = (newData) => {
    console.log("handleDataChange: ", newData);
    const lanesRef = firebase
      .database()
      .ref(`/users/${user.uid}/boards/${props.boardId}/lanes`);
    lanesRef
      .set(newData.lanes)
      .then((d) => {
        console.log("Updated new data");
      })
      .catch((err) => console.log("Failed to update lanes", err));
  };

  return curBoardData == null ? (
    <CircularLoader color="secondary" />
  ) : (
    <main className={classes.content}>
      {/* {renderBoardLists(props.boardLists)} */}
      <Board
        data={curBoardData}
        style={{ backgroundColor: "white" }}
        editable
        canAddLanes
        draggable
        onDataChange={handleDataChange}
        onCardAdd={handleCardAdd}
      ></Board>
    </main>
  );
}

export { BoardContent };
