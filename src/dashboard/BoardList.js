import { useHistory } from "react-router-dom";
import { BoardListItem } from "./BoardListItem";

function BoardList(props) {
  const boardsList = props.boardsList;

  const history = useHistory();
  const boardListComponent = Object.keys(boardsList).map((objId) => {
    const boardItem = boardsList[objId];
    const boardId = boardItem.id;
    return (
      <BoardListItem
        key={boardId}
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
