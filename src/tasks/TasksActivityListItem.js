import PropTypes from "prop-types";
import {
  Grid,
  Button,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { useTheme } from "@material-ui/core/styles";

function TasksActivityListItem(props) {
  const theme = useTheme();
  return (
    <Grid item xs={10} sm={10} style={{ marginBottom: theme.spacing(2) }}>
      <Paper variant="outlined">
        <ListItem key={props.activityId}>
          <Grid container>
            <Grid item xs={12} sm={6} md={8}>
              <ListItemText style={{ marginRight: theme.spacing(2) }}>
                {props.text.length > 200
                  ? props.text.substring(0, 190) + "..."
                  : props.text}
              </ListItemText>
            </Grid>
            <Grid
              item
              xs={6}
              sm={4}
              md={2}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "flex-start",
              }}
            >
              <Button variant="contained" size="small" color="primary">
                <span style={{ fontSize: 12 }}>Priority</span>
                <ArrowDropDownIcon />
              </Button>
            </Grid>
            <Grid
              item
              xs={6}
              sm={2}
              md={2}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
          </Grid>
        </ListItem>
      </Paper>
    </Grid>
  );
}

TasksActivityListItem.propTypes = {
  taskId: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.oneOf([null]),
  ]).isRequired,
  text: PropTypes.string.isRequired,
};

export { TasksActivityListItem };
