import { useState } from "react";
import { DashDrawer } from "../components/DashDrawer";
import { BoardContent } from "./BoardContent";
import { sampleBoardLists } from "./sampleBoardLists";

function BoardHome(props) {
  const [boardLists, setBoardsList] = useState(sampleBoardLists);

  return (
    <div>
      <DashDrawer />
      <BoardContent boardLists={boardLists} boardId={props.boardId} />
    </div>
  );
}

export { BoardHome };
