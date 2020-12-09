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

function CalendarWeekTimeSlot(props) {
  const classes = useStyles();

  const renderSlots = () => {
    const slotsJsx = [];
    for (let i = 0; i < CONSTANTS.CALENDAR.DAYS_IN_WEEK; i++) {
      const event = {}; // TODO: Get event from backend
      const jsx = <CalendarWeekDaySlot events={event} />;
      slotsJsx.push(jsx);
    }
    return slotsJsx;
  };

  return <div className={classes.weekSlotContainer}>{renderSlots()}</div>;
}

export { CalendarWeekTimeSlot };
