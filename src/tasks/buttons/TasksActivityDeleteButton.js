import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import { IconButton } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { deleteTaskActivity } from "../../services/tasks-activity";

function TasksActivityDeleteButton(props) {
  const theme = useTheme();

  const handleClick = () => {
    deleteTaskActivity(props.taskId, props.activityId);
  };

  return (
    <IconButton
      variant="contained"
      size="small"
      style={{ color: theme.palette.error.main }}
      disableRipple
      onClick={handleClick}
    >
      <DeleteForeverIcon />
    </IconButton>
  );
}

TasksActivityDeleteButton.propTypes = {
  taskId: PropTypes.string.isRequired,
  activityId: PropTypes.string.isRequired,
};

TasksActivityDeleteButton.defaultProps = {
  taskId: null,
  activityId: null,
};

export { TasksActivityDeleteButton };
