import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";
import { CalendarWeekTimeSlot } from "./CalendarWeekTimeSlot";
import { makeStyles } from "@material-ui/core/styles";
import CONSTANTS from "../utils/constants";

const useStyles = makeStyles((theme) => ({
  hide: {
    display: "none !important",
  },
  weekContainer: {
    display: "flex",
    width: "calc(100% - 80px)",
    flexDirection: "column",
    marginLeft: "auto",
    marginRight: theme.spacing(2),
  },
}));

function CalendarWeek({
  show,
  numSlots,
  selectedDate,
  openCreateEventModal,
  setModalPreset,
}) {
  const classes = useStyles();

  const renderTimeSlots = () => {
    const weekSlotsJsx = [];
    for (let i = 0; i < CONSTANTS.CALENDAR.HOURS_IN_DAY - 1; i++) {
      const jsx = (
        <CalendarWeekTimeSlot
          numSlots={numSlots}
          selectedDate={selectedDate}
          key={i}
          startHour={i}
          openCreateEventModal={openCreateEventModal}
          setModalPreset={setModalPreset}
        />
      );
      weekSlotsJsx.push(jsx);
    }
    return weekSlotsJsx;
  };

  return (
    <div className={clsx(classes.weekContainer, { [classes.hide]: !show })}>
      {renderTimeSlots()}
    </div>
  );
}

CalendarWeek.propTypes = {
  show: PropTypes.bool.isRequired,
  numSlots: PropTypes.number.isRequired,
  selectedDate: PropTypes.instanceOf(moment).isRequired,
  openCreateEventModal: PropTypes.func.isRequired,
  setModalPreset: PropTypes.func.isRequired,
};

export { CalendarWeek };
