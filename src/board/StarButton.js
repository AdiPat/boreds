import { useState } from "react";
import { yellow } from "@material-ui/core/colors";
import { IconButton } from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";

function StarButton() {
  const [starred, setStarred] = useState(false);

  const handleStarFlip = () => {
    setStarred(!starred);
    // TOOD: Add call to star service
  };

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

export { StarButton };
