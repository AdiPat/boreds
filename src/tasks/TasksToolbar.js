import React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar, Grid } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { TasksVisibilityButton } from "./buttons/TasksVisibilityButton";
import { TasksInviteButton } from "./buttons/TasksInviteButton";
import { TasksDeleteButton } from "./buttons/TasksDeleteButton";
import { TasksStarButton } from "./buttons/TasksStarButton";
import { TasksSelectButton } from "./buttons/TasksSelectButton";
import { TasksToolbarTitle } from "./TasksToolbarTitle";
import {
  attachTaskTitleListener,
  detachTaskTitleListener,
} from "../services/tasks";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    border: "1px solid",
    borderColor: grey[300],
    borderRadius: "5px",
    paddingRight: 0,
    paddingLeft: theme.spacing(2),
    marginLeft: theme.spacing(11),
    marginRight: theme.spacing(4),
    marginTop: theme.spacing(10),
    ["@media (max-width: 400px)"]: {
      marginLeft: theme.spacing(10),
      marginRight: theme.spacing(4),
    },
  },
}));

function TasksToolbar(props) {
  const classes = useStyles();
  const [toolbarTitle, setToolbarTitle] = useState("");

  useEffect(() => {
    const taskId = props.taskId;
    if (taskId) {
      attachTaskTitleListener(taskId, setToolbarTitle);
    } else {
      setToolbarTitle("");
    }
    return function cleanup() {
      detachTaskTitleListener(taskId);
    };
  }, [props.userId, props.taskId, toolbarTitle]);

  return (
    <Grid container>
      <Toolbar variant="regular" className={classes.toolbar}>
        <TasksToolbarTitle title={toolbarTitle} />
        {props.userId ? (
          <React.Fragment>
            <TasksSelectButton />
            <TasksVisibilityButton
              userId={props.userId}
              taskId={props.taskId}
            />
            <TasksInviteButton taskId={props.taskId} />
            <TasksDeleteButton
              userId={props.userId}
              taskId={props.taskId}
              taskTitle={toolbarTitle}
            />
            <TasksStarButton userId={props.userId} taskId={props.taskId} />
          </React.Fragment>
        ) : null}
      </Toolbar>
    </Grid>
  );
}

TasksToolbar.propTypes = {
  userId: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
};

TasksToolbar.defaultProps = {
  taskId: undefined,
  taskTitle: "",
};

export { TasksToolbar };
