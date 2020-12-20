import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";
import { Paper } from "@material-ui/core";
import { WeekTimeSlot } from "./WeekTimeSlot";
import { makeStyles } from "@material-ui/core/styles";
import { CONSTANTS } from "../../utils/constants";

const useStyles = makeStyles((theme) => ({
  hide: {
    display: "none !important",
  },
  weekContainer: {
    display: "flex",
    width: "calc(100% - 80px)",
    flexDirection: "column",
    marginLeft: "auto",
    paddingBottom: 0,
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}));

function Week({ show, numSlots, selectedDate }) {
  const classes = useStyles();

  const renderTimeSlots = () => {
    const weekSlotsJsx = [];
    for (let i = 0; i < CONSTANTS.CALENDAR.HOURS_IN_DAY - 1; i++) {
      const jsx = (
        <WeekTimeSlot
          numSlots={numSlots}
          selectedDate={selectedDate}
          key={i}
          startHour={i}
        />
      );
      weekSlotsJsx.push(jsx);
    }
    return weekSlotsJsx;
  };

  return (
    <Paper
      className={clsx(classes.weekContainer, { [classes.hide]: !show })}
      elevation={3}
    >
      {renderTimeSlots()}
    </Paper>
  );
}

Week.propTypes = {
  show: PropTypes.bool.isRequired,
  numSlots: PropTypes.number.isRequired,
  selectedDate: PropTypes.instanceOf(moment).isRequired,
};

export { Week };
