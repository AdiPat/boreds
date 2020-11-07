import { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import AppContext from "../providers/AppContext";
import { BoardHome } from "../board/BoardHome";

function BoardPage(props) {
  const { user } = useContext(AppContext);
  const boardId = props.match.params.boardId;

  return user ? <BoardHome boardId={boardId} /> : <Redirect to="/login" />;
}

export { BoardPage };
