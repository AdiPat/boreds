import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { CONSTANTS } from "../utils/constants";
import { getDurationFlags } from "../utils/calendar-utils";
import { CalendarUIProvider } from "./CalendarUIProvider";
import CalendarContext from "../providers/CalendarContext";
import { CalendarHeader } from "./header/Header";
import { TimeStrip } from "./misc/TimeStrip";
import { Week } from "./week/Week";
import { Month } from "./month/Month";
import { Year } from "./year/Year";

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
  const [numSlots, setNumSlots] = useState(0);
  const { duration, selectedDate } = useContext(CalendarContext);

  const isDuration = getDurationFlags(duration);

  useEffect(() => {
    const _numSlots = CONSTANTS.CALENDAR.NUM_DAYS[duration];
    setNumSlots(_numSlots);
  }, [duration]);

  return (
    <CalendarUIProvider>
      <main className={classes.content}>
        <CalendarHeader
          selectedDate={selectedDate}
          duration={duration}
          isDuration={isDuration}
        />
        <div className={classes.calendar}>
          <TimeStrip duration={duration} isDuration={isDuration} />
          <Week
            show={isDuration.day || isDuration.week || isDuration.fourdays}
            numSlots={numSlots}
            selectedDate={selectedDate}
          />
          <Month selectedDate={selectedDate} show={isDuration.month} />
          <Year selectedDate={selectedDate} show={isDuration.year} />
        </div>
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
