import PropTypes from "prop-types";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import CONSTANTS from "../utils/constants";
import { CalendarWeekDaySlot } from "./CalendarWeekDaySlot";

const useStyles = makeStyles((theme) => ({
  weekSlotContainer: {
    display: "flex",
    width: "100%",
    marginRight: theme.spacing(2),
  },
}));

function CalendarWeekTimeSlot({ selectedDate, numSlots, startHour }) {
  const classes = useStyles();

  const renderSlots = () => {
    const slotsJsx = [];

    for (let i = 0; i < numSlots; i++) {
      const event = {}; // TODO: Get event from backend
      const jsx = (
        <CalendarWeekDaySlot
          selectedDate={selectedDate}
          events={event}
          startHour={startHour}
          day={i}
          key={i}
        />
      );
      slotsJsx.push(jsx);
    }
    return slotsJsx;
  };

  return <div className={classes.weekSlotContainer}>{renderSlots()}</div>;
}

CalendarWeekTimeSlot.propTypes = {
  numSlots: PropTypes.number.isRequired,
  selectedDate: PropTypes.instanceOf(moment).isRequired,
  startHour: PropTypes.number.isRequired,
};

export { CalendarWeekTimeSlot };
