import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { yellow } from "@material-ui/core/colors";
import { IconButton } from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import {
  attachTaskStarListener,
  detachTaskStarListener,
  starTask,
  unstarTask,
} from "../../services/tasks";

function TasksStarButton(props) {
  const [starred, setStarred] = useState(false);

  const handleStarFlip = () => {
    if (starred) {
      unstarTask(props.userId, props.taskId);
    } else {
      starTask(props.userId, props.taskId);
    }
  };

  useEffect(() => {
    attachTaskStarListener(props.userId, props.taskId, setStarred);

    return function cleanup() {
      detachTaskStarListener(props.userId, props.taskId);
    };
  }, [props.taskId]);

  return props.taskId ? (
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
  ) : null;
}

TasksStarButton.propTypes = {
  userId: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
};

TasksStarButton.defaultProps = {
  userId: null,
  taskId: null,
};

export { TasksStarButton };
