import { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import CONSTANTS from "../utils/constants";
import { CalendarSlotTimeIndicator } from "./CalendarSlotTimeIndicator";
import { getSlotDividerFlags } from "../services/calendar";
import CalendarContext from "../providers/CalendarContext";

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

function CalendarWeekDaySlot({
  selectedDate,
  isCurrent,
  slotMoment,
  openCreateEventModal,
  setModalPreset,
}) {
  const classes = useStyles();
  let dividerFlags = CONSTANTS.CALENDAR.DAY_TIME_SLOT_FLAGS;

  if (isCurrent) {
    dividerFlags = getSlotDividerFlags(selectedDate, slotMoment);
  }

  // events
  const [slotEvents, setSlotEvents] = useState([]);
  const { events } = useContext(CalendarContext);

  useEffect(() => {
    const dateKey = slotMoment.format("DD-MM-YYYY");
    const timeKey = slotMoment.format("HH");
    try {
      const _slotEvents = events[dateKey][timeKey];
      if (_slotEvents) {
        setSlotEvents(_slotEvents);
      }
    } catch (err) {
      setSlotEvents([]);
    }
  }, [slotMoment]);

  const handleClick = (event) => {
    const bounds = event.target.getBoundingClientRect();
    const yOffset = event.clientY - bounds.top;
    const divHeight = event.currentTarget.offsetHeight;
    let _modalPreset = slotMoment;

    if (yOffset > divHeight / 2) {
      _modalPreset = slotMoment.clone().add(30, "minutes");
    }

    setModalPreset(_modalPreset);
    openCreateEventModal();
  };

  return (
    <div className={clsx(classes.daySlot)} onClick={handleClick}>
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
  openCreateEventModal: PropTypes.func.isRequired,
  setModalPreset: PropTypes.func.isRequired,
};

export { CalendarWeekDaySlot };
