import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { TasksActivityList } from "./TasksActivityList";
import { ActivityInputField } from "./ActivityInputField";

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    paddingRight: 0,
    paddingLeft: 0,
    marginLeft: theme.spacing(11),
    marginTop: theme.spacing(2),
    alignItems: "flex-start",
    ["@media (max-width: 400px)"]: {
      marginLeft: theme.spacing(7),
    },
  },
}));

function TasksContent(props) {
  const classes = useStyles();

  return (
    <main className={classes.content} id="tasksContent">
      {props.userId ? <ActivityInputField taskId={props.taskId} /> : null}
      <TasksActivityList userId={props.userId} taskId={props.taskId} />
    </main>
  );
}

TasksContent.propTypes = {
  userId: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
};

TasksContent.defaultProps = {
  userId: null,
  taskId: null,
};

export { TasksContent };
