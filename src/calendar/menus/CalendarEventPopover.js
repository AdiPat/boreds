import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Popover, Typography, Grid, Divider } from "@material-ui/core";
import CONSTANTS from "../../utils/constants";

const useStyles = makeStyles((theme) => ({
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  popoverDescription: {
    padding: theme.spacing(2),
  },
}));

function CalendarEventPopover({ anchorEl, handleClose, event }) {
  const classes = useStyles();
  let popoverAlignment = CONSTANTS.POPOVER.ALIGN_CENTER_RIGHT;

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
            <Typography variant="h6">{event.title}</Typography>
            <div>
              <Typography variant="subtitle2">
                {event.date.format("dddd, MMMM DD, YYYY")}
              </Typography>
              <Typography variant="subtitle2">
                {event.startTime.format("hh:mm A") +
                  " to " +
                  event.endTime.format("hh:mm A")}
              </Typography>
            </div>
          </div>
          <Divider />
          <div className={classes.popoverDescription}>
            <Typography variant="subtitle1">{event.description}</Typography>
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
  event: {},
};

export { CalendarEventPopover };
