import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CONSTANTS from "../utils/constants";
import { getTimeSlots } from "../services/calendar";
import { CalendarTimeStripDiv } from "./CalendarTimeStripDiv";

const useStyles = makeStyles((theme) => ({
  hideStrip: {
    display: "none !important",
  },
  timeStrip: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    paddingBottom: theme.spacing(4),
  },
}));

function CalendarTimeStrip({ duration }) {
  const classes = useStyles();
  const isYear = duration === CONSTANTS.CALENDAR.DURATIONS.year;
  const isMonth = duration === CONSTANTS.CALENDAR.DURATIONS.month;

  const renderSlots = () => {
    const slots = getTimeSlots();
    const slotsJsx = slots.map((slot) => <CalendarTimeStripDiv slot={slot} />);
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
};

export { CalendarTimeStrip };
