import { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CalendarContext from "../providers/CalendarContext";
import { CalendarMonthWeek } from "./CalendarMonthWeek";
import { splitMonthToWeeks } from "../utils/util";

const useStyles = makeStyles((theme) => ({
  monthContainer: {
    width: "calc(100% - 80px)",
    display: "flex",
    flexDirection: "column",
    marginLeft: "auto",
    marginRight: theme.spacing(2),
  },
}));

function CalendarMonth() {
  const classes = useStyles();
  const { calendar, selectedDate } = useContext(CalendarContext);

  const renderWeeks = () => {
    const weeks = splitMonthToWeeks(calendar);
    const weeksJsx = weeks.map((week) => {
      return <CalendarMonthWeek week={week} />;
    });
    return weeksJsx;
  };

  return <div className={classes.monthContainer}>{renderWeeks()}</div>;
}

export { CalendarMonth };
