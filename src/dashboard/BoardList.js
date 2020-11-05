import { BoardListItem } from "./BoardListItem";

function BoardList(props) {
  const boardsList = props.boardsList;
  const boardListComponent = boardsList.map((boardItem) => (
    <BoardListItem title={boardItem.title}></BoardListItem>
  ));
  return boardListComponent;
}

export { BoardList };
