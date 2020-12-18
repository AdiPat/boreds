import { useContext } from "react";
import PropTypes from "prop-types";
import { Tooltip, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { CalendarUIContext } from "../CalendarUIContext";
import { deleteCalendarEvent } from "../../services/calendar-api";

function EventPopoverDeleteButton({ eventId, closePopover }) {
  const { calendarSnackbar } = useContext(CalendarUIContext);

  const handleDeleteEvent = (e) => {
    deleteCalendarEvent(eventId).then((res) => {
      if (res.status) {
        calendarSnackbar.show("Deleted event. ");
      } else {
        let errMsg = res.details;
        if (!errMsg || errMsg.length == 0) {
          errMsg = "Failed to delete event. Try again later.";
        }
        calendarSnackbar.show(errMsg);
      }
      closePopover();
    });
  };

  return (
    <div>
      <Tooltip title="Delete" aria-label="edit-event-tooltip">
        <IconButton
          size="medium"
          aria-label="delete-event"
          onClick={handleDeleteEvent}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}

EventPopoverDeleteButton.propTypes = {
  eventId: PropTypes.string.isRequired,
  closePopover: PropTypes.func.isRequired,
};

export { EventPopoverDeleteButton };
