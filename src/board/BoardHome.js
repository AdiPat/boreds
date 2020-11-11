import { useState } from "react";
import { DashDrawer } from "../components/DashDrawer";
import { BoardContent } from "./BoardContent";

function BoardHome(props) {
  const [boardTitle, setBoardTitle] = useState("");

  return (
    <div>
      <DashDrawer dashTitle={boardTitle} />
      <BoardContent boardId={props.boardId} setBoardTitle={setBoardTitle} />
    </div>
  );
}

export { BoardHome };
