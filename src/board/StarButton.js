import PropTypes from "prop-types";
import { yellow } from "@material-ui/core/colors";
import { IconButton } from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";

function StarButton(props) {
  return (
    <IconButton onClick={props.handleStarFlip}>
      {props.starred ? (
        <StarIcon
          style={{
            starIcon: {
              color: yellow[700],
            },
          }}
        />
      ) : (
        <StarBorderIcon />
      )}
    </IconButton>
  );
}

StarButton.propTypes = {
  handleStarFlip: PropTypes.func.isRequired,
  starred: PropTypes.bool.isRequired,
};

export { StarButton };
