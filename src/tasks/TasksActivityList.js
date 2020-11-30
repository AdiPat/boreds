import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { List, Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { TasksActivityListItem } from "./TasksActivityListItem";
import {
  attachTasksActivitiesListener,
  detachTasksActivitiesListener,
} from "../services/tasks-activity";

function TasksActivityList(props) {
  const [activities, setActivites] = useState({});
  const theme = useTheme();

  const renderList = () => {
    let listJsx = [];
    listJsx = Object.keys(activities).map((activityId) => (
      <TasksActivityListItem
        activityId={activityId}
        text={activities[activityId].text}
      />
    ));
    return listJsx;
  };

  useEffect(() => {
    if (props.taskId) {
      attachTasksActivitiesListener(props.taskId, setActivites);
    }

    return function cleanup() {
      if (props.taskId) {
        detachTasksActivitiesListener(props.taskId);
      }
    };
  }, [props.taskId]);

  return (
    <Grid container style={{ padding: theme.spacing(0, 2) }}>
      <Grid item xs={12}>
        <List>{renderList()}</List>
      </Grid>
    </Grid>
  );
}

TasksActivityList.propTypes = {
  taskId: PropTypes.string.isRequired,
};

TasksActivityList.defaultProps = {
  taskId: null,
};

export { TasksActivityList };
