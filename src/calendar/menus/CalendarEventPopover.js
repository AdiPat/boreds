import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Popover,
  Typography,
  Button,
  Divider,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import CONSTANTS from "../../utils/constants";

const useStyles = makeStyles((theme) => ({
  hide: {
    display: "none",
  },
  popoverContainer: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    //minHeight: theme.spacing(30),
    minWidth: theme.spacing(70),
    width: theme.spacing(70),
  },
  popoverHeader: {
    display: "flex",
    padding: theme.spacing(2),
    flexDirection: "column",
    justifyContent: "space-between",
    // alignItems: "center",
  },
  popoverHeaderMain: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  popoverDescription: {
    padding: theme.spacing(2),
  },
}));

function CalendarEventPopover({
  anchorEl,
  handleClose,
  event,
  openEditEventModal,
}) {
  const classes = useStyles();
  let popoverAlignment = CONSTANTS.POPOVER.ALIGN_CENTER_RIGHT;

  let formattedDate = "";
  let formattedInterval = "";

  if (event.date) {
    formattedDate = event.date.format("dddd, MMMM DD, YYYY");
  }

  if (event.startTime && event.endTime) {
    const startTime = event.startTime.format("hh:mm A");
    const endTime = event.endTime.format("hh:mm A");
    formattedInterval = `${startTime} to ${endTime}`;
  }

  return (
    <div>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={popoverAlignment.anchorOrigin}
        transformOrigin={popoverAlignment.transformOrigin}
      >
        <div className={classes.popoverContainer}>
          <div className={classes.popoverHeader}>
            <div className={classes.popoverHeaderMain}>
              <Typography variant="h6">{event.title}</Typography>
              <Tooltip title="Edit" aria-label="edit-event-tooltip">
                <IconButton
                  size="medium"
                  aria-label="edit-event"
                  onClick={openEditEventModal}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div>
              <Typography variant="subtitle2">{formattedDate}</Typography>
              <Typography variant="subtitle2">{formattedInterval}</Typography>
            </div>
          </div>
          <Divider />
          <div className={classes.popoverDescription}>
            <Typography variant="subtitle1">{event.description}</Typography>
            <Button
              onClick={openEditEventModal}
              className={clsx({
                [classes.hide]: event.description
                  ? event.description.length
                  : false,
              })}
            >
              Add Description
            </Button>
          </div>
        </div>
      </Popover>
    </div>
  );
}

CalendarEventPopover.propTypes = {
  event: PropTypes.object.isRequired,
  anchorEl: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

CalendarEventPopover.defaultProps = {
  anchorEl: null,
  event: {},
  onClose: () => {},
};

export { CalendarEventPopover };
