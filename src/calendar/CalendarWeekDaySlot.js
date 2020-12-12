import { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { getWeekDaySlotMoment } from "../services/calendar";

const useStyles = makeStyles((theme) => ({
  daySlot: {
    boxSizing: "border-box",
    display: "flex",
    borderBottom: "1px solid lightgrey",
    borderRight: "1px solid lightgrey",
    "&:first-child": {
      borderLeft: "1px solid lightgrey",
    },
    flexGrow: "1",
    flexBasis: "0",
    justifyContent: "center",
    alignItems: "center",
    minHeight: theme.spacing(6),
  },
}));

function CalendarWeekDaySlot({ event, startHour, day, selectedDate }) {
  const classes = useStyles();
  const [curMoment, setCurMoment] = useState(
    getWeekDaySlotMoment(selectedDate, startHour, day)
  );

  return <div className={classes.daySlot}></div>;
}

CalendarWeekDaySlot.propTypes = {
  event: PropTypes.object.isRequired,
  startHour: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  selectedDate: PropTypes.instanceOf(moment).isRequired,
};

export { CalendarWeekDaySlot };
