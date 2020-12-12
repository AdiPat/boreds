import clsx from "clsx";
import PropTypes from "prop-types";
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
