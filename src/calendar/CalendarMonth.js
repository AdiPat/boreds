import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { CalendarMonthWeek } from "./CalendarMonthWeek";
import { getWeekCalendar } from "../services/calendar";
import { splitMonthToWeeks } from "../utils/util";

const useStyles = makeStyles((theme) => ({
  hide: {
    display: "none !important",
  },
  monthContainer: {
    width: "calc(100% - 80px)",
    display: "flex",
    flexDirection: "column",
    marginLeft: "auto",
    marginRight: theme.spacing(2),
  },
}));

function CalendarMonth({ selectedDate, show }) {
  const classes = useStyles();

  const renderWeeks = () => {
    const calendar = getWeekCalendar(selectedDate.month(), selectedDate.year());
    const weeks = splitMonthToWeeks(calendar);
    const weeksJsx = weeks.map((week) => {
      return <CalendarMonthWeek week={week} />;
    });
    return weeksJsx;
  };

  return (
    <div className={clsx(classes.monthContainer, { [classes.hide]: !show })}>
      {renderWeeks()}
    </div>
  );
}

CalendarMonth.propTypes = {
  selectedDate: PropTypes.instanceOf(moment).isRequired,
  show: PropTypes.bool.isRequired,
};

CalendarMonth.defaultProps = {
  selectedDate: moment(),
  show: false,
};

export { CalendarMonth };
