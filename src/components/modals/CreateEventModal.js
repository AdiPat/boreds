import { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
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

function CreateEventModal({ open, handleCloseModal, datePreset, timePreset }) {
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
        <Typography variant="h3">Create Event</Typography>
        <Divider />
        <Grid container>
          <Grid item xs={12}>
            <TextField
              value={eventTitle}
              placeholder="Add Title"
              onChange={handleTitleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={eventDescription}
              placeholder="Add Description"
              onChange={handleDescriptionChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              style={{ textTransform: "none" }}
              onClick={(e) => setDatePickerAnchorEl(e.currentTarget)}
            >
              <Typography variant="subtitle1">
                {eventDate.format("dddd , MMMM DD")}
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={6}>
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
          </Grid>
          <Grid item xs={4} offset={8}>
            <Button variant="contained" color="primary">
              Save
            </Button>
          </Grid>
        </Grid>
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
