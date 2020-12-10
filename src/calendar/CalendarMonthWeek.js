import { makeStyles } from "@material-ui/core/styles";
import {CalendarMonthSlot} from './CalendarMonthSlot'; 

const useStyles = makeStyles((theme) => ({
  weekSlotContainer: {
    display: "flex",
    width: "100%",
    marginRight: theme.spacing(2),
  },
}));

function CalendarMonthWeek({ week }) {
  const classes = useStyles();

  const renderWeek = () => {
    const slotsJsx = week.map((day) => {
      return <CalendarMonthSlot day={day}/>;
    });
    return slotsJsx;
  };

  return <div className={classes.weekSlotContainer}>{renderWeek()}</div>;
}

export { CalendarMonthWeek };
