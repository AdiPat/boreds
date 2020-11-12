import { useState, useEffect, useContext } from "react";
import { DashDrawer } from "../components/DashDrawer";
import { BoardContent } from "./BoardContent";
import { BoardToolbar } from "./BoardToolbar";
import AppContext from "../providers/AppContext";
import { updateBoardLastOpened } from "../services/board";

function BoardHome(props) {
  const [boardTitle, setBoardTitle] = useState("");
  const [lastOpened, setLastOpened] = useState(null);
  const [isBoardPublic, setIsBoardPublic] = useState(false);
  const { state } = useContext(AppContext);
  const boardId = props.boardId;
  const userId = state.user.uid;

  useEffect(() => {
    console.log(lastOpened);
    if (!lastOpened) {
      const now = new Date();
      setLastOpened(now);
      updateBoardLastOpened(userId, boardId, now);
    }
  });

  return (
    <div>
      <DashDrawer dashTitle={" - " + boardTitle} />
      <BoardToolbar
        userId={props.userId}
        boardId={props.boardId}
        boardTitle={boardTitle}
        public={isBoardPublic}
      />
      <BoardContent
        boardId={props.boardId}
        setBoardTitle={setBoardTitle}
        setIsBoardPublic={setIsBoardPublic}
      />
    </div>
  );
}

export { BoardHome };
