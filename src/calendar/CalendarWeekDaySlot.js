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
import { CalendarEventChip } from "./CalendarEventChip";

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
    // justifyContent: "center",
    // alignItems: "center",
    minHeight: CONSTANTS.CALENDAR.DAY_SLOT_HEIGHT(theme),

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
    let _slotEvents = undefined;
    try {
      _slotEvents = events[dateKey][timeKey];
    } catch (err) {
      _slotEvents = [];
    } finally {
      setSlotEvents(_slotEvents ? _slotEvents : []);
    }
  }, [slotMoment]);

  const renderEventChips = () => {
    const numChips = slotEvents.length;
    const chipsJsx = slotEvents.map((_event, i) => {
      const jsx = (
        <CalendarEventChip
          style={{
            position: "absolute",
            top: 0,
            left: `calc(${i} * (100% / ${numChips}))`,
            maxWidth: `calc(100% / ${numChips})`,
          }}
          key={i}
          title={_event.title}
        />
      );
      return jsx;
    });
    return chipsJsx;
  };

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
      {renderEventChips()}
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
