import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import CONSTANTS from "../utils/constants";
import { getDurationFlags } from "../utils/util";
import { CalendarUIProvider } from "./CalendarUIProvider";
import CalendarContext from "../providers/CalendarContext";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarTimeStrip } from "./CalendarTimeStrip";
import { CalendarWeek } from "./CalendarWeek";
import { CalendarMonth } from "./CalendarMonth";
import { CalendarYear } from "./CalendarYear";

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
  // header and days rendering
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
          <CalendarTimeStrip duration={duration} isDuration={isDuration} />
          <CalendarWeek
            show={isDuration.day || isDuration.week || isDuration.fourdays}
            numSlots={numSlots}
            selectedDate={selectedDate}
          />
          <CalendarMonth selectedDate={selectedDate} show={isDuration.month} />
          <CalendarYear selectedDate={selectedDate} show={isDuration.year} />
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
