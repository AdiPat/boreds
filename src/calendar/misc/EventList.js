import { useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { List } from "@material-ui/core";
import CalendarContext from "../../providers/CalendarContext";
import { EventListItem } from "./EventListItem";
import { ListMoreEventsButton } from "../buttons/ListMoreEventsButton";

const MAX_LIST_ITEMS = 3;

function EventList({ date }) {
  const { getCalendarEvents } = useContext(CalendarContext);

  const slotEvents = getCalendarEvents(date, "day");

  const renderEvents = () => {
    let slotsJsx = slotEvents.map((event, i) => {
      return i < MAX_LIST_ITEMS ? (
        <EventListItem event={event} key={i} />
      ) : null;
    });

    if (slotEvents.length > MAX_LIST_ITEMS) {
      const numExtraEvents = slotEvents.length - MAX_LIST_ITEMS;
      slotsJsx.push(
        <ListMoreEventsButton
          extraEventsCount={numExtraEvents}
          key={MAX_LIST_ITEMS}
        />
      );
    }

    return slotsJsx;
  };

  return <List>{renderEvents()}</List>;
}

EventList.propTypes = {
  date: PropTypes.instanceOf(moment).isRequired,
};

export { EventList };
