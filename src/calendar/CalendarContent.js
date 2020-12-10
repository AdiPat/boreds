import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import CONSTANTS from "../utils/constants";
import CalendarContext from "../providers/CalendarContext";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarTimeStrip } from "./CalendarTimeStrip";
import { CalendarWeek } from "./CalendarWeek";

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
}));

function CalendarContent(props) {
  const classes = useStyles();
  const [timeStripOffset, setTimeStripOffset] = useState(0);
  const [numSlots, setNumSlots] = useState(0);
  const {
    state: { duration },
  } = useContext(CalendarContext);

  useEffect(() => {
    const _numSlots = CONSTANTS.CALENDAR.NUM_DAYS[duration];
    setNumSlots(_numSlots);
  }, [duration]);

  return (
    <main className={classes.content}>
      <CalendarTimeStrip duration="week" topOffset={timeStripOffset} />
      <CalendarHeader duration={duration} setOffset={setTimeStripOffset} />
      <CalendarWeek numSlots={numSlots} />
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
