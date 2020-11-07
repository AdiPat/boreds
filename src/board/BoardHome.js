import { useState } from "react";
import { DashDrawer } from "../components/DashDrawer";
import { BoardContent } from "./BoardContent";
import { sampleBoardLists, sampleLanes } from "./sampleBoardLists";
import Board from 'react-trello'

function BoardHome(props) {
  const [boardLists, setBoardsList] = useState(sampleLanes);

  return (
    <div>
      <DashDrawer />
      <BoardContent boardLists={boardLists} boardId={props.boardId} />
    </div>
  );
}

export { BoardHome };
