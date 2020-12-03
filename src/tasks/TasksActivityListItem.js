import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Grid,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
} from "@material-ui/core";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { TasksActivityDeleteButton } from "./buttons/TasksActivityDeleteButton";
import { ActivityPriorityButton } from "./buttons/ActivityPriorityButton";
import { ActivityPriorityChip } from "./ActivityPriorityChip";

const useStyles = makeStyles((theme) => ({
  gridItem: {
    display: "flex",
    alignItems: "center",
  },
  priorityBtn: {
    justifyContent: "left",
    alignSelf: "flex-start",
  },
  scheduleBtn: {
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  deleteBtn: {
    justifyContent: "left",
    alignSelf: "flex-start",
  },
  hide: {
    display: "none !important",
  },
}));

function TasksActivityListItem(props) {
  const theme = useTheme();
  const classes = useStyles();
  const isLoggedIn = props.userId !== null && props.userId !== undefined;

  return (
    <Grid item xs={10} sm={10} style={{ marginBottom: theme.spacing(2) }}>
      <Paper variant="outlined">
        <ListItem key={props.activityId}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12}>
              <ListItemText style={{ marginRight: theme.spacing(2) }}>
                {props.text}
              </ListItemText>
            </Grid>
            <Grid
              item
              xs={6}
              sm={2}
              md={2}
              className={clsx(classes.priorityBtn, {
                [classes.hide]: !isLoggedIn,
              })}
            >
              <ActivityPriorityButton
                taskId={props.taskId}
                activityId={props.activityId}
              />
            </Grid>
            <Grid
              item
              xs={1}
              sm={1}
              md={1}
              className={clsx(classes.scheduleBtn, {
                [classes.hide]: !isLoggedIn,
              })}
            >
              <IconButton
                variant="contained"
                size="small"
                color="primary"
                disableRipple
              >
                <ScheduleIcon />
              </IconButton>
            </Grid>
            <Grid
              item
              xs={1}
              sm={1}
              md={1}
              className={clsx(classes.deleteBtn, {
                [classes.hide]: !isLoggedIn,
              })}
            >
              <TasksActivityDeleteButton
                taskId={props.taskId}
                activityId={props.activityId}
              />
            </Grid>
          </Grid>
          <ActivityPriorityChip priority={props.priority} />
        </ListItem>
      </Paper>
    </Grid>
  );
}

TasksActivityListItem.propTypes = {
  taskId: PropTypes.string.isRequired,
  activityId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
};

TasksActivityListItem.defaultProps = {
  priority: "none",
};

export { TasksActivityListItem };
