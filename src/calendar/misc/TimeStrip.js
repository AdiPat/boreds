import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { CONSTANTS } from "../../utils/constants";
import { getTimeSlots } from "../../services/calendar";
import { TimeStripDiv } from "./TimeStripDiv";

const useStyles = makeStyles((theme) => ({
  hideStrip: {
    display: "none !important",
  },
  timeStrip: {
    display: "flex",
    alignItems: "center",
    // justifyContent: "center",
    flexDirection: "column",
    paddingBottom: theme.spacing(4),
  },
}));

function TimeStrip({ duration }) {
  const classes = useStyles();
  const isYear = duration === CONSTANTS.CALENDAR.DURATIONS.year;
  const isMonth = duration === CONSTANTS.CALENDAR.DURATIONS.month;

  const renderSlots = () => {
    const slots = getTimeSlots();
    const slotsJsx = slots.map((slot) => <TimeStripDiv slot={slot} />);
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

TimeStrip.propTypes = {
  duration: PropTypes.oneOfType(Object.values(CONSTANTS.CALENDAR.DURATIONS))
    .isRequired,
};

export { TimeStrip };
