import { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import AppContext from "../providers/AppContext";
import { BoardHome } from "../board/BoardHome";
import { CircularLoader } from "../components/CircularLoader";

function BoardPage(props) {
  const { user } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const boardId = props.match.params.boardId;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  });

  return isLoading ? (
    <CircularLoader color="secondary" />
  ) : user ? (
    <BoardHome boardId={boardId} userId={user.uid} />
  ) : (
    <Redirect to="/login" />
  );
}

export { BoardPage };
