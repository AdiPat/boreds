import clsx from "clsx";
import PropTypes from "prop-types";
import { grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import CONSTANTS from "../utils/constants";
import { CalendarSlotTimeIndicator } from "./CalendarSlotTimeIndicator";
import { getSlotDividerFlags } from "../services/calendar";

const useStyles = makeStyles((theme) => ({
  daySlot: {
    position: "relative",
    boxSizing: "border-box",
    display: "flex",
    borderRight: "1px",
    borderRightStyle: "solid",
    borderRightColor: grey[300],
    borderBottom: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: grey[300],
    flexGrow: "1",
    flexBasis: "0",
    justifyContent: "center",
    alignItems: "center",
    minHeight: theme.spacing(6),

    "&:first-child": {
      borderLeft: "1px solid lightgrey",
    },

    "&:hover": {
      backgroundColor: grey[200],
      cursor: "pointer",
    },
  },
}));

function CalendarWeekDaySlot({ selectedDate, isCurrent, slotMoment }) {
  const classes = useStyles();

  let dividerFlags = CONSTANTS.CALENDAR.DAY_TIME_SLOT_FLAGS;

  if (isCurrent) {
    dividerFlags = getSlotDividerFlags(selectedDate, slotMoment);
  }

  return (
    <div className={clsx(classes.daySlot)}>
      {isCurrent ? (
        <CalendarSlotTimeIndicator dividerFlags={dividerFlags} />
      ) : null}
    </div>
  );
}

CalendarWeekDaySlot.propTypes = {
  slotMoment: PropTypes.instanceOf(moment).isRequired,
  isCurrent: PropTypes.bool.isRequired,
  selectedDate: PropTypes.instanceOf(moment).isRequired,
};

export { CalendarWeekDaySlot };
