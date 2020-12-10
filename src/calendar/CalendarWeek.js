import { CalendarWeekTimeSlot } from "./CalendarWeekTimeSlot";
import { makeStyles } from "@material-ui/core/styles";
import CONSTANTS from "../utils/constants";

const useStyles = makeStyles((theme) => ({
  weekContainer: {
    width: "calc(100% - 80px)",
    display: "flex",
    flexDirection: "column",
    marginLeft: "auto",
    marginRight: theme.spacing(2),
  },
}));

function CalendarWeek({ numSlots }) {
  const classes = useStyles();

  const renderTimeSlots = () => {
    const weekSlotsJsx = [];
    for (let i = 0; i < CONSTANTS.CALENDAR.HOURS_IN_DAY - 1; i++) {
      const jsx = <CalendarWeekTimeSlot numSlots={numSlots} key={i} />;
      weekSlotsJsx.push(jsx);
    }
    return weekSlotsJsx;
  };

  return <div className={classes.weekContainer}>{renderTimeSlots()}</div>;
}

export { CalendarWeek };
