import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import CONSTANTS from "../utils/constants";
import { getDurationFlags } from "../utils/util";
import CalendarContext from "../providers/CalendarContext";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarTimeStrip } from "./CalendarTimeStrip";
import { CalendarWeek } from "./CalendarWeek";
import { CalendarMonth } from "./CalendarMonth";
import { CalendarYear } from "./CalendarYear";
import { CreateEventModal } from "../components/modals/CreateEventModal";
import { CalendarEventPopover } from "./menus/CalendarEventPopover";

const useStyles = makeStyles((theme) => ({
  content: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    paddingRight: 0,
    paddingLeft: 0,
    marginLeft: theme.spacing(8),
    marginTop: theme.spacing(9),
    alignItems: "flex-start",
    ["@media (max-width: 400px)"]: {
      marginLeft: theme.spacing(7),
    },
  },
  calendar: {
    display: "flex",
    width: "100%",
  },
}));

function CalendarContent({ userId, extras }) {
  const classes = useStyles();
  // event popover
  const [eventAnchorEl, setEventAnchorEl] = useState(null);
  const [curEvent, setCurEvent] = useState({});
  //
  const [openModal, setOpenModal] = useState(false);
  const [modalPreset, setModalPreset] = useState(moment());
  const [numSlots, setNumSlots] = useState(0);
  const {
    state: { duration },
    selectedDate,
    setSelectedDate,
    setCalendarDuration,
  } = useContext(CalendarContext);

  const isDuration = getDurationFlags(duration);

  const handleOpenEventPopover = (e, calendarEvent) => {
    console.log("handleOpenEventPopover(): ");
    e.stopPropagation();
    setCurEvent(calendarEvent);
    setEventAnchorEl(e.currentTarget);
  };

  const handleCloseEventPopover = () => {
    setEventAnchorEl(null);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // useEffect(() => {
  //   if (!extras.invalidDate && extras.selectedDate) {
  //     setSelectedDate(extras.selectedDate);
  //   }

  //   if (extras.duration) {
  //     setCalendarDuration(extras.duration);
  //   }
  // }, [extras]);

  useEffect(() => {
    const _numSlots = CONSTANTS.CALENDAR.NUM_DAYS[duration];
    setNumSlots(_numSlots);
  }, [duration]);

  console.log("CalendarContent.render(): ");

  return (
    <main className={classes.content}>
      <CalendarHeader
        selectedDate={selectedDate}
        duration={duration}
        isDuration={isDuration}
      />
      <div className={classes.calendar}>
        <CalendarTimeStrip duration={duration} isDuration={isDuration} />
        <CalendarWeek
          show={isDuration.day || isDuration.week || isDuration.fourdays}
          numSlots={numSlots}
          selectedDate={selectedDate}
          openCreateEventModal={handleOpenModal}
          setModalPreset={setModalPreset}
          eventPopover={{
            anchorEl: eventAnchorEl,
            handleOpen: handleOpenEventPopover,
            handleClose: handleCloseEventPopover,
          }}
        />
        <CalendarMonth selectedDate={selectedDate} show={isDuration.month} />
        <CalendarYear selectedDate={selectedDate} show={isDuration.year} />
      </div>
      <CreateEventModal
        open={openModal}
        handleCloseModal={handleCloseModal}
        datePreset={modalPreset}
        timePreset={modalPreset}
      />
      <CalendarEventPopover
        anchorEl={eventAnchorEl}
        handleClose={handleCloseEventPopover}
        event={curEvent}
      />
    </main>
  );
}

CalendarContent.propTypes = {
  userId: PropTypes.string.isRequired,
};

CalendarContent.defaultProps = {
  userId: undefined,
};

export { CalendarContent };
