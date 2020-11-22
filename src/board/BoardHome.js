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
  const [isBoardStarred, setIsBoardStarred] = useState(false);
  const [boardLoaded, setBoardLoaded] = useState(false);

  const { state } = useContext(AppContext);
  const boardId = props.boardId;
  const userId = props.userId;
  const isLoggedIn = Boolean(userId);

  useEffect(() => {
    if (!lastOpened && userId) {
      const now = new Date();
      setLastOpened(now);
      updateBoardLastOpened(userId, boardId, now);
    }
  });

  return (
    <div>
      <DashDrawer dashTitle={" - " + boardTitle} userId={props.userId} />
      {boardLoaded && isLoggedIn ? (
        <BoardToolbar
          userId={props.userId}
          boardId={props.boardId}
          boardTitle={boardTitle}
          public={isBoardPublic}
          starred={isBoardStarred}
        />
      ) : null}
      <BoardContent
        boardId={props.boardId}
        setBoardTitle={setBoardTitle}
        setIsBoardPublic={setIsBoardPublic}
        setIsBoardStarred={setIsBoardStarred}
        isBoardPublic={isBoardPublic}
        setBoardLoaded={setBoardLoaded}
      />
    </div>
  );
}

export { BoardHome };
