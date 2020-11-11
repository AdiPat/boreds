import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BoardListItem } from "./BoardListItem";
import { getBoards, getCurrentUser } from "../services/user";

function BoardList(props) {
  const boardsList = props.boardsList;

  console.log("BoardList: ", boardsList);

  const history = useHistory();
  const boardListComponent = Object.keys(boardsList).map((boardId) => {
    const boardItem = boardsList[boardId];
    return (
      <BoardListItem
        clickHandler={() => history.push(`/board/${boardId}`)}
        boardId={boardId}
        title={boardItem.title}
        isStarred={boardItem.starred}
      ></BoardListItem>
    );
  });
  return boardListComponent;
}

export { BoardList };
