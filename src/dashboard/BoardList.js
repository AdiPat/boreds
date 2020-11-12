import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BoardListItem } from "./BoardListItem";
import { DeleteBoardModal } from "../components/DeleteBoardModal";
import { getBoards, getCurrentUser } from "../services/user";

function BoardList(props) {
  const boardsList = props.boardsList;

  console.log("BoardList: ", boardsList);

  const history = useHistory();
  const boardListComponent = Object.keys(boardsList).map((objId) => {
    const boardItem = boardsList[objId];
    const boardId = boardItem.id;
    return (
      <BoardListItem
        clickHandler={() => history.push(`/board/${boardId}`)}
        boardId={boardId}
        title={boardItem.title}
        isStarred={boardItem.starred}
        loadDeleteModal={props.loadDeleteModal}
      ></BoardListItem>
    );
  });
  return boardListComponent;
}

export { BoardList };
