import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { yellow } from "@material-ui/core/colors";
import { IconButton } from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import {
  starBoard,
  unstarBoard,
  attachStarListener,
  detachStarListener,
} from "../../services/star";

function StarButton(props) {
  const [starred, setStarred] = useState(false);

  const handleStarFlip = () => {
    if (starred) {
      unstarBoard(props.userId, props.boardId);
    } else {
      starBoard(props.userId, props.boardId);
    }
  };

  useEffect(() => {
    attachStarListener(props.userId, props.boardId, setStarred);

    return function cleanup() {
      detachStarListener(props.userId, props.boardId);
    };
  }, []);

  return (
    <IconButton onClick={handleStarFlip}>
      {starred ? (
        <StarIcon
          style={{
            color: yellow[700],
          }}
        />
      ) : (
        <StarBorderIcon />
      )}
    </IconButton>
  );
}

StarButton.propTypes = {
  userId: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
};

export { StarButton };
