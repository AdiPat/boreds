import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import CONSTANTS from "../utils/constants";
import { getDurationFlags } from "../utils/util";
import { CalendarUIProvider } from "./CalendarUIProvider";
import CalendarContext from "../providers/CalendarContext";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarTimeStrip } from "./CalendarTimeStrip";
import { CalendarWeek } from "./CalendarWeek";
import { CalendarMonth } from "./CalendarMonth";
import { CalendarYear } from "./CalendarYear";
import { EditEventModal } from "../components/modals/EditEventModal";
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
  // edit event modal
  const [openEditEventModal, setOpenEditEventModal] = useState(false);
  // create event modal
  const [openCreateEventModal, setOpenCreateEventModal] = useState(false);
  const [modalPreset, setModalPreset] = useState(moment());
  // header and days rendering
  const [numSlots, setNumSlots] = useState(0);
  const { duration, selectedDate } = useContext(CalendarContext);

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

  const handleOpenCreateEventModal = () => {
    setOpenCreateEventModal(true);
  };

  const handleCloseCreateEventModal = () => {
    setOpenCreateEventModal(false);
  };

  const handleOpenEditEventModal = () => {
    setOpenEditEventModal(true);
  };

  const handleCloseEditEventModal = () => {
    setOpenEditEventModal(false);
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

  const eventPopover = {
    anchorEl: eventAnchorEl,
    handleOpen: handleOpenEventPopover,
    handleClose: handleCloseEventPopover,
  };

  return (
    <CalendarUIProvider>
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
            openCreateEventModal={handleOpenCreateEventModal}
            setModalPreset={setModalPreset}
            eventPopover={eventPopover}
          />
          <CalendarMonth
            selectedDate={selectedDate}
            show={isDuration.month}
            eventPopover={eventPopover}
          />
          <CalendarYear selectedDate={selectedDate} show={isDuration.year} />
        </div>
        <CreateEventModal
          open={openCreateEventModal}
          handleCloseModal={handleCloseCreateEventModal}
          datePreset={modalPreset}
          timePreset={modalPreset}
        />
        <EditEventModal
          open={openEditEventModal}
          handleCloseModal={handleCloseEditEventModal}
          curEvent={curEvent}
          openEventPopover={handleOpenEventPopover}
        />
        <CalendarEventPopover
          anchorEl={eventAnchorEl}
          handleClose={handleCloseEventPopover}
          event={curEvent}
          openEditEventModal={handleOpenEditEventModal}
        />
      </main>
    </CalendarUIProvider>
  );
}

CalendarContent.propTypes = {
  userId: PropTypes.string.isRequired,
};

CalendarContent.defaultProps = {
  userId: undefined,
};

export { CalendarContent };
