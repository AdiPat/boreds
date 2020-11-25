import PropTypes from "prop-types";
import { useState } from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { yellow } from "@material-ui/core/colors";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";

function StarButton(props) {
  const [starred, setStarred] = useState(false);
  const boardId = props.boardId;

  const handleStarFlip = () => {
    setStarred(!starred);
    // TODO: Set star in database
  };

  return (
    <Tooltip title={starred ? "Star Board" : "Unstar Board"} placement="top">
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
    </Tooltip>
  );
}

StarButton.propTypes = {
  boardId: PropTypes.string.isRequired,
};

export { StarButton };
