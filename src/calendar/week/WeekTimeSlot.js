import PropTypes from "prop-types";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import {
  getFourDaySlotMoment,
  getWeekDaySlotMoment,
} from "../../services/calendar";
import { WeekDaySlot } from "./WeekDaySlot";
import CONSTANTS from "../../utils/constants";

const useStyles = makeStyles((theme) => ({
  weekSlotContainer: {
    display: "flex",
    width: "100%",
    marginRight: theme.spacing(2),
  },
}));

function WeekTimeSlot({ selectedDate, numSlots, startHour }) {
  const classes = useStyles();

  const getSlotMoment = (day) => {
    let slotMoment = null;
    if (numSlots === CONSTANTS.CALENDAR.NUM_DAYS.day) {
      slotMoment = selectedDate.clone().hour(startHour).startOf("hour");
    } else if (numSlots === CONSTANTS.CALENDAR.NUM_DAYS.week) {
      slotMoment = getWeekDaySlotMoment(selectedDate, startHour, day);
    } else if (numSlots === CONSTANTS.CALENDAR.NUM_DAYS.fourdays) {
      slotMoment = getFourDaySlotMoment(selectedDate, startHour, day);
    }
    return slotMoment;
  };

  const renderSlots = () => {
    const slotsJsx = [];

    for (let i = 0; i < numSlots; i++) {
      const day = i;
      let slotMoment = getSlotMoment(day);

      const jsx = (
        <WeekDaySlot
          selectedDate={selectedDate}
          slotMoment={slotMoment}
          key={i}
        />
      );
      slotsJsx.push(jsx);
    }
    return slotsJsx;
  };

  return <div className={classes.weekSlotContainer}>{renderSlots()}</div>;
}

WeekTimeSlot.propTypes = {
  numSlots: PropTypes.number.isRequired,
  selectedDate: PropTypes.instanceOf(moment).isRequired,
  startHour: PropTypes.number.isRequired,
};

export { WeekTimeSlot };
