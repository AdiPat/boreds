import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  daySlot: {
    boxSizing: "border-box",
    display: "flex",
    borderBottom: "1px solid lightgrey",
    borderRight: "1px solid lightgrey",
    "&:first-child": {
      borderLeft: "1px solid lightgrey",
    },
    flexGrow: "1",
    flexBasis: "0",
    justifyContent: "center",
    alignItems: "center",
    minHeight: theme.spacing(6),
  },
}));

function CalendarWeekDaySlot({ event }) {
  const classes = useStyles();

  return <div className={classes.daySlot}> </div>;
}

CalendarWeekDaySlot.propTypes = {
  event: PropTypes.object.isRequired,
};

export { CalendarWeekDaySlot };
