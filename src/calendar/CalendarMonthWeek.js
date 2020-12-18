import PropTypes from "prop-types";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { CalendarMonthSlot } from "./CalendarMonthSlot";

const useStyles = makeStyles((theme) => ({
  weekSlotContainer: {
    display: "flex",
    width: "100%",
    marginRight: theme.spacing(2),
  },
}));

function CalendarMonthWeek({ week, eventPopover }) {
  const classes = useStyles();

  const renderWeek = () => {
    const slotsJsx = week.map((date) => {
      return <CalendarMonthSlot date={date} eventPopover={eventPopover} />;
    });
    return slotsJsx;
  };

  return <div className={classes.weekSlotContainer}>{renderWeek()}</div>;
}

CalendarMonthWeek.propTypes = {
  date: PropTypes.instanceOf(moment).isRequired,
  eventPopover: PropTypes.object.isRequired,
};

export { CalendarMonthWeek };
