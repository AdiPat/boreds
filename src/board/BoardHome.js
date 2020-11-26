import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { BoardContent } from "./BoardContent";
import { BoardToolbar } from "./BoardToolbar";
import { PublicBoardContent } from "./PublicBoardContent";
import { updateBoardLastOpened, isBoardPublic } from "../services/board";
import { AppDrawer } from "../components/drawer/AppDrawer";

function BoardHome(props) {
  const [boardTitle, setBoardTitle] = useState("");
  const [lastOpened, setLastOpened] = useState(null);
  const [boardPublicStatus, setBoardPublicStatus] = useState(false);
  const userId = props.userId;
  const isLoggedIn = Boolean(userId);

  const _updateBoardVisibilityStatus = async (boardId) => {
    let publicStatus = await isBoardPublic(boardId);
    setBoardPublicStatus(publicStatus);
  };

  useEffect(() => {
    if (!lastOpened && userId) {
      const now = new Date();
      setLastOpened(now);
      updateBoardLastOpened(props.userId, props.boardId, now);
    }
    _updateBoardVisibilityStatus();
  });

  return (
    <div>
      <AppDrawer dashTitle={" - " + boardTitle} userId={props.userId} />
      {isLoggedIn ? (
        <BoardToolbar
          userId={props.userId}
          boardId={props.boardId}
          boardTitle={boardTitle}
        />
      ) : null}
      {isLoggedIn ? (
        <BoardContent boardId={props.boardId} setBoardTitle={setBoardTitle} />
      ) : boardPublicStatus ? (
        <PublicBoardContent
          boardId={props.boardId}
          setBoardTitle={setBoardTitle}
        />
      ) : null}
    </div>
  );
}

PropTypes.propTypes = {
  userId: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.oneOf([null]).isRequired,
  ]).isRequired,
  boardId: PropTypes.string.isRequired,
};

export { BoardHome };
