import { useHistory } from "react-router";
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";

function OpenBoardButton(props) {
  const history = useHistory();

  const handleOpenBoard = (boardId) => {
    history.push(`/board/${boardId}`);
  };

  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={() => handleOpenBoard(props.boardId)}
    >
      Open
    </Button>
  );
}

OpenBoardButton.propTypes = {
  boardId: PropTypes.string.isRequired,
};

export { OpenBoardButton };
