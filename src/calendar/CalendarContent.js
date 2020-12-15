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

function CalendarContent(props) {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [modalPreset, setModalPreset] = useState(moment());
  const [numSlots, setNumSlots] = useState(0);
  const {
    state: { duration },
    selectedDate,
  } = useContext(CalendarContext);

  const isDuration = getDurationFlags(duration);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const _numSlots = CONSTANTS.CALENDAR.NUM_DAYS[duration];
    setNumSlots(_numSlots);
  }, [duration]);

  console.log("CalendarContent.render(): ");

  return (
    <main className={classes.content}>
      <CalendarHeader duration={duration} isDuration={isDuration} />
      <div className={classes.calendar}>
        <CalendarTimeStrip duration={duration} isDuration={isDuration} />
        <CalendarWeek
          show={isDuration.day || isDuration.week || isDuration.fourdays}
          numSlots={numSlots}
          selectedDate={selectedDate}
          openCreateEventModal={handleOpenModal}
          setModalPreset={setModalPreset}
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
