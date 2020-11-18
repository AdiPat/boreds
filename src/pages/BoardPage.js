import { useContext } from "react";
import AppContext from "../providers/AppContext";
import { BoardHome } from "../board/BoardHome";

function BoardPage(props) {
  const { user } = useContext(AppContext);
  const boardId = props.match.params.boardId;
  let userId = null;

  if (user) {
    userId = user.uid;
  }

  return <BoardHome boardId={boardId} userId={userId} />;
}

export { BoardPage };
