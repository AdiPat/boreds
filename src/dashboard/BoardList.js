import { useHistory } from "react-router-dom";
import { BoardListItem } from "./BoardListItem";

function BoardList(props) {
  const boardsList = props.boardsList;
  const history = useHistory();
  const boardListComponent = boardsList.map((boardItem) => (
    <BoardListItem
      clickHandler={() => history.push(`/board/${boardItem.boardId}`)}
      title={boardItem.title}
    ></BoardListItem>
  ));
  return boardListComponent;
}

export { BoardList };
