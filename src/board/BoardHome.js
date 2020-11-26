import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { BoardContent } from "./BoardContent";
import { BoardToolbar } from "./BoardToolbar";
import { PublicBoardContent } from "./PublicBoardContent";
import { updateBoardLastOpened, isBoardPublic } from "../services/board";
import AppContext from "../providers/AppContext";
import { AppDrawer } from "../components/drawer/AppDrawer";

function BoardHome(props) {
  const [boardTitle, setBoardTitle] = useState("");
  const [lastOpened, setLastOpened] = useState(null);
  const [boardPublicStatus, setBoardPublicStatus] = useState(false);
  const { state } = useContext(AppContext);
  const board = state.boardsList[boardId];
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
          public={boardPublicStatus}
        />
      ) : null}
      {isLoggedIn ? (
        <BoardContent
          boardId={props.boardId}
          setBoardTitle={setBoardTitle}
          isBoardPublic={boardPublicStatus}
        />
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
