import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Popover, Typography, Button, Divider } from "@material-ui/core";
import CONSTANTS from "../../utils/constants";
import { EventPopoverEditButton } from "../buttons/EventPopoverEditButton";
import { EventPopoverDeleteButton } from "../buttons/EventPopoverDeleteButton";
import { EventPopoverAddDescriptionButton } from "../buttons/EventPopoverAddDescriptionButton";

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
    flexDirection: "column",
    justifyContent: "space-between",
    // alignItems: "center",
  },
  popoverHeaderMain: {
    display: "flex",
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
              <EventPopoverEditButton onClick={openEditEventModal} />
              <EventPopoverDeleteButton onClick={() => {}} />
            </div>
            <div>
              <Typography variant="subtitle2">{formattedDate}</Typography>
              <Typography variant="subtitle2">{formattedInterval}</Typography>
            </div>
          </div>
          <Divider />
          <div className={classes.popoverDescription}>
            <Typography variant="subtitle1">{event.description}</Typography>
            <EventPopoverAddDescriptionButton
              onClick={openEditEventModal}
              show={event.description ? event.description.length : false}
            />
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
