import { useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { List } from "@material-ui/core";
import CalendarContext from "../../providers/CalendarContext";
import { EventListItem } from "./EventListItem";
import { ListMoreEventsButton } from "../buttons/ListMoreEventsButton";
import { EventListAddButton } from "../buttons/EventListAddButton";

const MAX_LIST_ITEMS = 3;

function EventList({ date, maxItems, shouldLimit, wrapText, showAddButton }) {
  const { getCalendarEvents } = useContext(CalendarContext);

  const slotEvents = getCalendarEvents(date, "day");

  const renderEvents = () => {
    let slotsJsx = slotEvents.map((event, i) => {
      let jsx = <EventListItem event={event} key={i} wrapText={wrapText} />;
      if (shouldLimit && i >= maxItems) {
        jsx = null;
      }
      return jsx;
    });

    if (shouldLimit && slotEvents.length > maxItems) {
      const numExtraEvents = slotEvents.length - maxItems;
      slotsJsx.push(
        <ListMoreEventsButton
          date={date}
          extraEventsCount={numExtraEvents}
          key={maxItems}
        />
      );
    }

    if (slotEvents.length == 0 && showAddButton) {
      slotsJsx.push(<EventListAddButton date={date} />);
    }

    return slotsJsx;
  };

  return <List>{renderEvents()}</List>;
}

EventList.propTypes = {
  date: PropTypes.instanceOf(moment).isRequired,
  maxItems: PropTypes.number,
  wrapText: PropTypes.bool,
  shouldLimit: PropTypes.bool,
  showAddButton: PropTypes.bool,
};

EventList.defaultProps = {
  maxItems: MAX_LIST_ITEMS,
  shouldLimit: true,
  wrapText: true,
  showAddButton: false,
};

export { EventList };
