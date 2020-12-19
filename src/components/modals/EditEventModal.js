import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Snackbar,
  Grid,
  TextField,
  Typography,
  Divider,
  Button,
  Portal,
} from "@material-ui/core";
import { SimpleModal } from "./SimpleModal";
import { DatePickerPopover } from "../menus/DatePickerPopover";
import { TimePickerPopover } from "../menus/TimePickerPopover";
import { updateCalendarEvent } from "../../services/calendar-api";
import { compareCalendarEvents } from "../../services/calendar";
import {
  hashEventId,
  mapCalendarEventFields,
} from "../../utils/calendar-utils";
import CONSTANTS from "../../utils/constants";

const useStyles = makeStyles((theme) => ({
  modalContainer: {
    width: theme.spacing(50),
  },
  modalTitle: {
    marginBottom: theme.spacing(1),
  },
  eventTextFieldContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    marginBottom: theme.spacing(2),
    paddingLeft: theme.spacing(1),
  },
  eventTextField: {
    width: "100%",
  },
  actionContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
}));

function EditEventModal({
  open,
  handleCloseModal,
  curEvent,
  openEventPopover,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [datePickerAnchorEl, setDatePickerAnchorEl] = useState(null);
  const [startTimePickerAnchorEl, setStartTimePickerAnchorEl] = useState(null);
  const [endTimePickerAnchorEl, setEndTimePickerAnchorEl] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  // event
  const [eventTitle, setEventTitle] = useState(curEvent.title);
  const [eventDescription, setEventDescription] = useState(
    curEvent.description
  );
  const [eventDate, setEventDate] = useState(curEvent.date);
  const [eventStartTime, setEventStartTime] = useState(curEvent.startTime);
  const [eventEndTime, setEventEndTime] = useState(curEvent.endTime);

  const closeSnackbar = (event, reason) => {
    setOpenSnackbar(false);
  };

  const handleTitleChange = (event) => {
    setEventTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setEventDescription(event.target.value);
  };

  const resetParams = () => {
    setEventTitle(curEvent.title);
    setEventDescription(curEvent.description);
    setEventDate(curEvent.date);
    setEventStartTime(curEvent.startTime);
    setEventEndTime(curEvent.endTime);
  };

  // hack to update popover data
  const resetEventPopover = (eventId, updatedEvent) => {
    const btnId = hashEventId(eventId);
    const currentTarget = document.getElementById(btnId);
    const stopPropagation = () => {};
    openEventPopover({ currentTarget, stopPropagation }, updatedEvent);
  };

  useEffect(() => {
    resetParams();
  }, [curEvent]);

  const handleSaveEvent = () => {
    const eventId = curEvent.id;

    const updatedEvent = {
      eventTitle,
      eventDescription,
      eventDate,
      eventStartTime,
      eventEndTime,
    };

    // updated event with local format of field names
    const updatedEventLocal = mapCalendarEventFields(updatedEvent);
    updatedEventLocal.id = eventId;

    let areEventsEqual = compareCalendarEvents(updatedEventLocal, curEvent);

    if (areEventsEqual) {
      handleCloseModal();
      console.log("Event unchanged.");
      setSnackbarMessage("Event unchanged.");
      setOpenSnackbar(true);
      return;
    }

    updateCalendarEvent(eventId, updatedEvent).then((res) => {
      if (res.status) {
        setSnackbarMessage("Event updated.");
        setOpenSnackbar(true);
        resetEventPopover(eventId, updatedEventLocal);
        handleCloseModal();
      } else {
        let errMsg = res.details;
        if (!errMsg || errMsg.length == 0) {
          errMsg = "Failed to update event. Try again later.";
        }
        setSnackbarMessage(errMsg);
        setOpenSnackbar(true);
        handleCloseModal();
      }
    });
  };

  const handleReset = () => {
    resetParams();
  };

  return (
    <div>
      <SimpleModal openModal={open} handleCloseModal={handleCloseModal}>
        <div className={classes.modalContainer}>
          <div className={classes.modalTitle}>
            <Typography variant="h5" align="center">
              Edit Event
            </Typography>
            <Divider />
          </div>
          <div className={classes.eventTextFieldContainer}>
            <TextField
              label="Event Title"
              value={eventTitle}
              placeholder="Add Title"
              onChange={handleTitleChange}
              className={classes.eventTextField}
            />
          </div>
          <div className={classes.eventTextFieldContainer}>
            <TextField
              label="Event Description"
              value={eventDescription}
              placeholder="Add Description"
              onChange={handleDescriptionChange}
              className={classes.eventTextField}
            />
          </div>
          <div>
            <Button
              style={{ textTransform: "none" }}
              onClick={(e) => setDatePickerAnchorEl(e.currentTarget)}
            >
              <Typography variant="subtitle1">
                {eventDate ? eventDate.format("dddd , MMMM DD") : ""}
              </Typography>
            </Button>
          </div>
          <div>
            <Button onClick={(e) => setStartTimePickerAnchorEl(e.target)}>
              <Typography variant="subtitle2">
                {eventStartTime ? eventStartTime.format("h:mm A") : ""}
              </Typography>
            </Button>
            {" - "}
            <Button onClick={(e) => setEndTimePickerAnchorEl(e.target)}>
              <Typography variant="subtitle2">
                {eventEndTime ? eventEndTime.format("h:mm A") : ""}
              </Typography>
            </Button>
          </div>
          <div className={classes.actionContainer}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: theme.spacing(2) }}
              onClick={handleSaveEvent}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: theme.spacing(2) }}
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
          </div>
        </div>
      </SimpleModal>
      <Portal container={document.getElementById("root")}>
        <Snackbar
          anchorOrigin={CONSTANTS.POPOVER.ALIGN_BOTTOM_CENTER.anchorOrigin}
          open={openSnackbar}
          onClose={closeSnackbar}
          autoHideDuration={CONSTANTS.SNACKBAR.defaultDuration}
          message={snackbarMessage}
        />
      </Portal>

      <DatePickerPopover
        anchorEl={datePickerAnchorEl}
        closeMenu={() => setDatePickerAnchorEl(null)}
        selectedDate={eventDate}
        handleDateChange={setEventDate}
        disableToolbar={true}
      />
      <TimePickerPopover
        anchorEl={startTimePickerAnchorEl}
        closeMenu={() => setStartTimePickerAnchorEl(null)}
        selectedTime={eventStartTime}
        handleTimeChange={setEventStartTime}
      />
      <TimePickerPopover
        anchorEl={endTimePickerAnchorEl}
        closeMenu={() => setEndTimePickerAnchorEl(null)}
        selectedTime={eventEndTime}
        handleTimeChange={setEventEndTime}
      />
    </div>
  );
}

EditEventModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  curEvent: PropTypes.object.isRequired,
  openEventPopover: PropTypes.func.isRequired,
};

EditEventModal.defaultProps = {
  open: false,
  handleCloseModal: () => {},
};

export { EditEventModal };
