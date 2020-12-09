import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  timeStripSlot: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    minHeight: theme.spacing(6),
    minWidth: theme.spacing(6),
  },
  timeStripSlotData: {
    display: "flex",
    position: "absolute",
    bottom: "0",
    textAlign: "center",
  },
  timeSlotDivider: {
    position: "absolute",
    bottom: "-2px",
    right: "-40%",
    width: "100%",
    height: "2px",
    backgroundColor: grey[300],
    content: " ",
  },
}));

function CalendarTimeStripDiv({ slot }) {
  const classes = useStyles();
  return (
    <div key={slot.start + "-" + slot.end} className={classes.timeStripSlot}>
      <span className={classes.timeStripSlotData}>{slot.end}</span>
      <span className={classes.timeSlotDivider}></span>
    </div>
  );
}

CalendarTimeStripDiv.propTypes = {
  slot: PropTypes.object.isRequired,
};

export { CalendarTimeStripDiv };
