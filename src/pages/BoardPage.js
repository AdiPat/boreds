import { useContext, useEffect, useState } from "react";
import AppContext from "../providers/AppContext";
import { BoardHome } from "../board/BoardHome";
import { NotFoundPage } from "./NotFoundPage";
import { boardExists } from "../services/board";

function BoardPage(props) {
  const [resourceExists, setResourceExists] = useState(false);
  const { user } = useContext(AppContext);
  const boardId = props.match.params.boardId;
  let userId = null;

  if (user) {
    userId = user.uid;
  }

  useEffect(() => {
    console.log("resourceExists: ", resourceExists);
    boardExists(boardId).then((status) => setResourceExists(status));
  }, []);

  return resourceExists ? (
    <BoardHome boardId={boardId} userId={userId} />
  ) : (
    <NotFoundPage />
  );
}

export { BoardPage };
