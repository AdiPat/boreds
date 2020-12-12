import { useState, useEffect } from "react";
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
} from "@material-ui/core";
import { SimpleModal } from "./SimpleModal";
import { DatePickerPopover } from "../menus/DatePickerPopover";
import { TimePickerPopover } from "../menus/TimePickerPopover";
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

function CreateEventModal({ open, handleCloseModal, datePreset, timePreset }) {
  const classes = useStyles();
  const theme = useTheme();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [datePickerAnchorEl, setDatePickerAnchorEl] = useState(null);
  const [startTimePickerAnchorEl, setStartTimePickerAnchorEl] = useState(null);
  const [endTimePickerAnchorEl, setEndTimePickerAnchorEl] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState(datePreset);
  const [eventTimeStart, setEventTimeStart] = useState(timePreset);
  const [eventTimeEnd, setEventTimeEnd] = useState(
    timePreset.clone().add(30, "minutes")
  );

  useEffect(() => {
    setEventDate(datePreset);
    setEventTimeStart(timePreset);
    setEventTimeEnd(timePreset.clone().add(30, "minutes"));
  }, [timePreset, datePreset]);

  const closeSnackbar = (event, reason) => {
    setOpenSnackbar(false);
  };

  const handleTitleChange = (event) => {
    setEventTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setEventDescription(event.target.value);
  };

  return (
    <div>
      <SimpleModal openModal={open} handleCloseModal={handleCloseModal}>
        <div className={classes.modalContainer}>
          <div className={classes.modalTitle}>
            <Typography variant="h5" align="center">
              Create Event
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
                {eventDate.format("dddd , MMMM DD")}
              </Typography>
            </Button>
          </div>
          <div>
            <Button onClick={(e) => setStartTimePickerAnchorEl(e.target)}>
              <Typography variant="subtitle2">
                {eventTimeStart.format("h:mm A")}
              </Typography>
            </Button>
            {" - "}
            <Button onClick={(e) => setEndTimePickerAnchorEl(e.target)}>
              <Typography variant="subtitle2">
                {eventTimeEnd.format("h:mm A")}
              </Typography>
            </Button>
          </div>
          <div className={classes.actionContainer}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: theme.spacing(2) }}
            >
              Save
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
      <Snackbar
        anchorOrigin={CONSTANTS.POPOVER.ALIGN_BOTTOM_CENTER.anchorOrigin}
        open={openSnackbar}
        onClose={closeSnackbar}
        autoHideDuration={CONSTANTS.SNACKBAR.defaultDuration}
        message={snackbarMessage}
      />
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
        selectedTime={eventTimeStart}
        handleTimeChange={setEventTimeStart}
      />
      <TimePickerPopover
        anchorEl={endTimePickerAnchorEl}
        closeMenu={() => setEndTimePickerAnchorEl(null)}
        selectedTime={eventTimeEnd}
        handleTimeChange={setEventTimeEnd}
      />
    </div>
  );
}

CreateEventModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  datePreset: PropTypes.instanceOf(moment),
  timePreset: PropTypes.instanceOf(moment),
};

CreateEventModal.defaultProps = {
  open: false,
  handleCloseModal: () => {},
  datePreset: moment(),
  timePreset: moment(),
};

export { CreateEventModal };
