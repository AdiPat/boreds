import PropTypes from "prop-types";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import {
  getFourDaySlotMoment,
  getWeekDaySlotMoment,
  isSelectedDateInSlot,
} from "../services/calendar";
import { CalendarWeekDaySlot } from "./CalendarWeekDaySlot";
import CONSTANTS from "../utils/constants";

const useStyles = makeStyles((theme) => ({
  weekSlotContainer: {
    display: "flex",
    width: "100%",
    marginRight: theme.spacing(2),
  },
}));

function CalendarWeekTimeSlot({
  selectedDate,
  numSlots,
  startHour,
  openCreateEventModal,
  setModalPreset,
  eventPopover,
}) {
  const classes = useStyles();

  const getSlotMoment = (day) => {
    let slotMoment = null;
    if (numSlots === CONSTANTS.CALENDAR.NUM_DAYS.day) {
      slotMoment = selectedDate.clone().hour(startHour).startOf("hour");
    } else if (numSlots === CONSTANTS.CALENDAR.NUM_DAYS.week) {
      slotMoment = getWeekDaySlotMoment(selectedDate, startHour, day);
    } else if (numSlots == CONSTANTS.CALENDAR.NUM_DAYS.fourdays) {
      slotMoment = getFourDaySlotMoment(selectedDate, startHour, day);
    }
    return slotMoment;
  };

  const renderSlots = () => {
    const slotsJsx = [];

    for (let i = 0; i < numSlots; i++) {
      const day = i;
      let slotMoment = getSlotMoment(day);

      const isCurrent = isSelectedDateInSlot(selectedDate, slotMoment);
      const jsx = (
        <CalendarWeekDaySlot
          selectedDate={selectedDate}
          slotMoment={slotMoment}
          isCurrent={isCurrent}
          key={i}
          openCreateEventModal={openCreateEventModal}
          setModalPreset={setModalPreset}
          eventPopover={eventPopover}
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
  openCreateEventModal: PropTypes.func.isRequired,
  setModalPreset: PropTypes.func.isRequired,
  eventPopover: PropTypes.object.isRequired,
};

export { CalendarWeekTimeSlot };
