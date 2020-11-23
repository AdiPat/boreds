import { useState, useEffect } from "react";
import { DashDrawer } from "../components/DashDrawer";
import { BoardContent } from "./BoardContent";
import { BoardToolbar } from "./BoardToolbar";
import { PublicBoardContent } from "./PublicBoardContent";
import { updateBoardLastOpened, isBoardPublic } from "../services/board";

function BoardHome(props) {
  const [boardTitle, setBoardTitle] = useState("");
  const [lastOpened, setLastOpened] = useState(null);
  const [boardPublicStatus, setBoardPublicStatus] = useState(false);
  const [isBoardStarred, setIsBoardStarred] = useState(false);
  const [boardLoaded, setBoardLoaded] = useState(false);
  const boardId = props.boardId;
  const userId = props.userId;
  const isLoggedIn = Boolean(userId);

  const _updateBoardVisibilityStatus = async (boardId) => {
    let publicStatus = await isBoardPublic(props.boardId);
    setBoardPublicStatus(publicStatus);
  };

  useEffect(() => {
    if (!lastOpened && userId) {
      const now = new Date();
      setLastOpened(now);
      updateBoardLastOpened(userId, boardId, now);
    }
    _updateBoardVisibilityStatus();
  });

  return (
    <div>
      <DashDrawer dashTitle={" - " + boardTitle} userId={props.userId} />
      {boardLoaded && isLoggedIn ? (
        <BoardToolbar
          userId={props.userId}
          boardId={props.boardId}
          boardTitle={boardTitle}
          public={boardPublicStatus}
          starred={isBoardStarred}
        />
      ) : null}
      {boardLoaded && isLoggedIn ? (
        <BoardContent
          boardId={props.boardId}
          setBoardTitle={setBoardTitle}
          setIsBoardStarred={setIsBoardStarred}
          isBoardPublic={boardPublicStatus}
          setBoardLoaded={setBoardLoaded}
        />
      ) : boardPublicStatus ? (
        <PublicBoardContent
          boardId={props.boardId}
          setBoardTitle={setBoardTitle}
          setBoardLoaded={setBoardLoaded}
        />
      ) : null}
    </div>
  );
}

export { BoardHome };
