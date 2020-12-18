import { useState } from "react";
import PropTypes from "prop-types";
import { Tooltip, IconButton, Portal, Snackbar } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CONSTANTS from "../../utils/constants";
import { deleteCalendarEvent } from "../../services/calendar-api";

function EventPopoverDeleteButton({ eventId, closePopover }) {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const showSnackbar = (msg) => {
    setSnackbarMessage(msg);
    setOpenSnackbar(true);
  };

  const closeSnackbar = () => {
    setSnackbarMessage("");
    setOpenSnackbar(false);
  };

  const handleDeleteEvent = (e) => {
    deleteCalendarEvent(eventId).then((res) => {
      if (res.status) {
        showSnackbar("Deleted event. ");
      } else {
        let errMsg = res.details;
        if (!errMsg || errMsg.length == 0) {
          errMsg = "Failed to delete event. Try again later.";
        }
        showSnackbar(errMsg);
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
      <Portal container={document.getElementById("root")}>
        <Snackbar
          anchorOrigin={CONSTANTS.POPOVER.ALIGN_BOTTOM_CENTER.anchorOrigin}
          open={openSnackbar}
          onClose={closeSnackbar}
          autoHideDuration={CONSTANTS.SNACKBAR.defaultDuration}
          message={snackbarMessage}
        />
      </Portal>
    </div>
  );
}

EventPopoverDeleteButton.propTypes = {
  eventId: PropTypes.string.isRequired,
  closePopover: PropTypes.func.isRequired,
};

export { EventPopoverDeleteButton };
