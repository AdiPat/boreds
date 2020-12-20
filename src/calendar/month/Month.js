import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import moment from "moment";
import { MonthWeek } from "./MonthWeek";
import { getWeekCalendar } from "../../services/calendar";
import { splitMonthToWeeks } from "../../utils/calendar-utils";

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
    paddingBottom: theme.spacing(0),
    marginBottom: theme.spacing(4),
  },
}));

function Month({ selectedDate, show }) {
  const classes = useStyles();

  const renderWeeks = () => {
    const calendar = getWeekCalendar(selectedDate.month(), selectedDate.year());
    const weeks = splitMonthToWeeks(calendar);
    const weeksJsx = weeks.map((week) => {
      return <MonthWeek week={week} />;
    });
    return weeksJsx;
  };

  return (
    <Paper
      className={clsx(classes.monthContainer, { [classes.hide]: !show })}
      elevation={3}
    >
      {renderWeeks()}
    </Paper>
  );
}

Month.propTypes = {
  selectedDate: PropTypes.instanceOf(moment).isRequired,
  show: PropTypes.bool.isRequired,
};

Month.defaultProps = {
  selectedDate: moment(),
  show: false,
};

export { Month };
