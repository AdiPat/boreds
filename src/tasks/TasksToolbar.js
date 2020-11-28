import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { TasksVisibilityButton } from "./buttons/TasksVisibilityButton";
import { TasksInviteButton } from "./buttons/TasksInviteButton";
import { TasksDeleteButton } from "./buttons/TasksDeleteButton";
import { TasksStarButton } from "./buttons/TasksStarButton";
import { TasksSelectButton } from "./buttons/TasksSelectButton";
import { TasksToolbarTitle } from "./TasksToolbarTitle";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    border: "1px solid",
    borderColor: grey[300],
    borderRadius: "5px",
    flexGrow: 1,
    paddingRight: 0,
    paddingLeft: theme.spacing(2),
    marginLeft: theme.spacing(11),
    marginRight: theme.spacing(4),
    marginTop: theme.spacing(10),
    ["@media (max-width: 400px)"]: {
      marginLeft: theme.spacing(7),
    },
  },
}));

function TasksToolbar(props) {
  const classes = useStyles();

  return (
    <Toolbar variant="regular" className={classes.toolbar}>
      <TasksToolbarTitle title={props.title} />
      <TasksSelectButton taskId={props.taskId} />
      <TasksVisibilityButton userId={props.userId} taskId={props.taskId} />
      <TasksInviteButton taskId={props.taskId} />
      <TasksDeleteButton
        userId={props.userId}
        taskId={props.taskId}
        taskTitle={props.taskTitle}
      />
      <TasksStarButton userId={props.userId} taskId={props.taskId} />
    </Toolbar>
  );
}

TasksToolbar.propTypes = {
  userId: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
};

export { TasksToolbar };
