import PropTypes from "prop-types";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import {
  getWeekDaySlotMoment,
  isSelectedDateInSlot,
} from "../services/calendar";
import { CalendarWeekDaySlot } from "./CalendarWeekDaySlot";

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
}) {
  const classes = useStyles();

  const renderSlots = () => {
    const slotsJsx = [];

    for (let i = 0; i < numSlots; i++) {
      const day = i;
      const slotMoment = getWeekDaySlotMoment(selectedDate, startHour, day);
      const isCurrent = isSelectedDateInSlot(selectedDate, slotMoment);
      const jsx = (
        <CalendarWeekDaySlot
          selectedDate={selectedDate}
          slotMoment={slotMoment}
          isCurrent={isCurrent}
          key={i}
          openCreateEventModal={openCreateEventModal}
          setModalPreset={setModalPreset}
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
};

export { CalendarWeekTimeSlot };
