import PropTypes from "prop-types";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { MonthSlot } from "./MonthSlot";

const useStyles = makeStyles((theme) => ({
  weekSlotContainer: {
    display: "flex",
    width: "100%",
    marginRight: theme.spacing(2),
  },
}));

function MonthWeek({ week }) {
  const classes = useStyles();

  const renderWeek = () => {
    const slotsJsx = week.map((date) => {
      return <MonthSlot date={date} />;
    });
    return slotsJsx;
  };

  return <div className={classes.weekSlotContainer}>{renderWeek()}</div>;
}

MonthWeek.propTypes = {
  date: PropTypes.instanceOf(moment).isRequired,
};

export { MonthWeek };
