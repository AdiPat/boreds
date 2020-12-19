import { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { grey } from "@material-ui/core/colors";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import moment from "moment";
import CONSTANTS from "../../utils/constants";
import { SlotTimeIndicator } from "../misc/SlotTimeIndicator";
import {
  getSlotDividerFlags,
  isSelectedDateInSlot,
} from "../../services/calendar";
import { CalendarUIContext } from "../CalendarUIContext";
import CalendarContext from "../../providers/CalendarContext";
import { EventChip } from "../misc/EventChip";

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

function WeekDaySlot({ selectedDate, slotMoment }) {
  const theme = useTheme();
  const classes = useStyles();

  const isCurrent = isSelectedDateInSlot(selectedDate, slotMoment);
  let dividerFlags = CONSTANTS.CALENDAR.DAY_TIME_SLOT_FLAGS;

  if (isCurrent) {
    dividerFlags = getSlotDividerFlags(selectedDate, slotMoment);
  }

  // events
  const [slotEvents, setSlotEvents] = useState([[], [], []]);
  const { getTimeDividedCalendarEvents, eventsLastUpdated } = useContext(
    CalendarContext
  );
  const { createEventModal } = useContext(CalendarUIContext);

  useEffect(() => {
    let _slotEvents = getTimeDividedCalendarEvents(slotMoment);
    setSlotEvents(_slotEvents);
  }, [slotMoment, eventsLastUpdated]);

  const renderEventChips = () => {
    const _chipsJsx = slotEvents.map((row, topIdx) => {
      return row.map((_event, i, arr) => {
        const endOffset = i == arr.length - 1 ? theme.spacing(2) : 0;
        const jsx = (
          <EventChip
            style={{
              position: "absolute",
              top: `calc(${topIdx} * 100%/3)`,
              left: `calc(${i} * (100% / ${row.length}))`,
              width: `calc((100% / ${row.length}) - ${endOffset}px)`,
            }}
            key={i}
            event={_event}
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

    createEventModal.show(_modalPreset);
  };

  return (
    <div className={clsx(classes.daySlot)} onClick={handleClick}>
      {renderEventChips()}
      {isCurrent ? <SlotTimeIndicator dividerFlags={dividerFlags} /> : null}
    </div>
  );
}

WeekDaySlot.propTypes = {
  slotMoment: PropTypes.instanceOf(moment).isRequired,
  selectedDate: PropTypes.instanceOf(moment).isRequired,
};

export { WeekDaySlot };
