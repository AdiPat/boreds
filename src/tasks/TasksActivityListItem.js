import PropTypes from "prop-types";
import {
  Grid,
  Button,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { useTheme } from "@material-ui/core/styles";
import { TasksActivityDeleteButton } from "./buttons/TasksActivityDeleteButton";

function TasksActivityListItem(props) {
  const theme = useTheme();
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
              style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                alignSelf: "flex-start",
              }}
            >
              <Button variant="contained" size="small" color="primary">
                <span style={{ fontSize: 10 }}>Priority</span>
                <ArrowDropDownIcon />
              </Button>
            </Grid>
            <Grid
              item
              xs={1}
              sm={1}
              md={1}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "left",
                alignSelf: "flex-start",
              }}
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
              style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                alignSelf: "flex-start",
              }}
            >
              <TasksActivityDeleteButton
                taskId={props.taskId}
                activityId={props.activityId}
              />
            </Grid>
          </Grid>
        </ListItem>
      </Paper>
    </Grid>
  );
}

TasksActivityListItem.propTypes = {
  taskId: PropTypes.string.isRequired,
  activityId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export { TasksActivityListItem };
