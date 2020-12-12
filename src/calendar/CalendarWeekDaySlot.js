import { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import CONSTANTS from "../utils/constants";
import { getSlotDividerFlags } from "../services/calendar";

const useStyles = makeStyles((theme) => ({
  daySlot: {
    position: "relative",
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
  divider: {
    position: "absolute",
    height: "2px",
    backgroundColor: "red",
    width: "100%",
    "&::before": {
      position: "absolute",
      display: "block",
      content: '" "',
      height: "10px",
      width: "10px",
      left: "-5px",
      top: "-4px",
      borderRadius: "100%",
      backgroundColor: "red",
    },
  },
  dividerStart: {
    top: "5%",
  },
  dividerQuarter: {
    top: "25%",
  },
  dividerMiddle: {
    top: "50%",
  },
  dividerThreeQuarter: {
    top: "75%",
  },
  dividerFull: {
    top: "99%",
  },
}));

function CalendarWeekDaySlot({ selectedDate, isCurrent, slotMoment }) {
  const classes = useStyles();

  let dividerFlags = CONSTANTS.CALENDAR.DAY_TIME_SLOT_FLAGS;

  if (isCurrent) {
    dividerFlags = getSlotDividerFlags(selectedDate, slotMoment);
  }

  return (
    <div className={clsx(classes.daySlot)}>
      <span
        className={clsx({
          [classes.divider]: isCurrent,
          [classes.dividerStart]: dividerFlags.start,
          [classes.dividerQuarter]: dividerFlags.quarter,
          [classes.dividerMiddle]: dividerFlags.middle,
          [classes.dividerThreeQuarter]: dividerFlags.threeQuarter,
          [classes.dividerFull]: dividerFlags.full,
        })}
      >
        {" "}
      </span>
    </div>
  );
}

CalendarWeekDaySlot.propTypes = {
  slotMoment: PropTypes.instanceOf(moment).isRequired,
  isCurrent: PropTypes.bool.isRequired,
  selectedDate: PropTypes.instanceOf(moment).isRequired,
};

export { CalendarWeekDaySlot };
