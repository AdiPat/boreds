import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import CONSTANTS from "../utils/constants";
import { getTimeSlots } from "../services/calendar";

const useStyles = (props) =>
  makeStyles((theme) => ({
    hideStrip: {
      display: "none",
    },
    timeStrip: {
      position: "absolute",
      top: props.topOffset,
      left: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      paddingBottom: theme.spacing(4),
    },
    timeStripSlot: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      minHeight: theme.spacing(6),
      minWidth: theme.spacing(6),
      // borderRight: "1px solid grey",
      // borderBottom: "1px solid lightgrey",
    },
    timeStripSlotData: {
      display: "flex",
      position: "absolute",
      bottom: "0",
      textAlign: "center",
    },
    timeSlotDivider: {
      position: "absolute",
      bottom: "-2px",
      right: "-40%",
      width: "100%",
      height: "2px",
      backgroundColor: grey[300],
      content: " ",
    },
  }));

function CalendarTimeStrip({ duration, topOffset }) {
  const classes = useStyles({ topOffset })();
  const isYear = duration === CONSTANTS.CALENDAR.DURATIONS.year;
  const isMonth = duration === CONSTANTS.CALENDAR.DURATIONS.month;

  const renderSlots = () => {
    const slots = getTimeSlots();
    const slotsJsx = slots.map((slot) => {
      return (
        <div
          key={slot.start + "-" + slot.end}
          className={classes.timeStripSlot}
        >
          <span className={classes.timeStripSlotData}>{slot.end}</span>
          <span className={classes.timeSlotDivider}></span>
        </div>
      );
    });
    return slotsJsx;
  };

  return (
    <div
      className={clsx(classes.timeStrip, {
        [classes.hideStrip]: isYear || isMonth,
      })}
    >
      {renderSlots()}
    </div>
  );
}

CalendarTimeStrip.propTypes = {
  duration: PropTypes.oneOfType(Object.values(CONSTANTS.CALENDAR.DURATIONS))
    .isRequired,
  topOffset: PropTypes.string.isRequired,
};

export { CalendarTimeStrip };
