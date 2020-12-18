import { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import CONSTANTS from "../utils/constants";
import { CalendarSlotTimeIndicator } from "./CalendarSlotTimeIndicator";
import {
  getSlotDividerFlags,
  isSelectedDateInSlot,
} from "../services/calendar";
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
  slotMoment,
  openCreateEventModal,
  setModalPreset,
  eventPopover,
}) {
  const classes = useStyles();
  const isCurrent = isSelectedDateInSlot(selectedDate, slotMoment);
  let dividerFlags = CONSTANTS.CALENDAR.DAY_TIME_SLOT_FLAGS;

  if (isCurrent) {
    dividerFlags = getSlotDividerFlags(selectedDate, slotMoment);
  }

  // events
  const [slotEvents, setSlotEvents] = useState([[], [], []]);
  const { events, eventsLastUpdated } = useContext(CalendarContext);

  useEffect(() => {
    const timeSlots = CONSTANTS.CALENDAR.DAY_TIME_SLOT;
    const dateKey = slotMoment.format("DD-MM-YYYY");
    const timeKey = slotMoment.format("HH");
    let _slotEventList = undefined;
    let _slotEvents = [[], [], []];
    try {
      _slotEventList = events[dateKey][timeKey];
    } catch (err) {
      _slotEventList = [];
    } finally {
      if (_slotEventList) {
        _slotEventList.forEach((slot) => {
          const startMinutes = slot.startTime.minutes();

          if (startMinutes < timeSlots.start.max) {
            _slotEvents[0].push(slot);
          } else if (
            startMinutes >= timeSlots.quarter.min &&
            startMinutes < timeSlots.quarter.max
          ) {
            _slotEvents[1].push(slot);
          } else if (startMinutes >= timeSlots.middle.min) {
            _slotEvents[2].push(slot);
          }
        });
        setSlotEvents(_slotEvents);
      }
    }
  }, [slotMoment, eventsLastUpdated]);

  const renderEventChips = () => {
    const _chipsJsx = slotEvents.map((row, topIdx) => {
      return row.map((_event, i) => {
        const jsx = (
          <CalendarEventChip
            style={{
              position: "absolute",
              top: `calc(${topIdx} * 100%/3)`,
              left: `calc(${i} * (100% / ${row.length}))`,
              maxWidth: `calc(100% / ${row.length})`,
            }}
            key={i}
            event={_event}
            eventPopover={eventPopover}
          />
        );
        return jsx;
      });
    });
    const chipsJsx = _chipsJsx.flat();
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
  selectedDate: PropTypes.instanceOf(moment).isRequired,
  openCreateEventModal: PropTypes.func.isRequired,
  setModalPreset: PropTypes.func.isRequired,
  eventPopover: PropTypes.object.isRequired,
};

export { CalendarWeekDaySlot };
