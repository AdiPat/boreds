import { useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import CalendarContext from "../providers/CalendarContext";
import { CalendarEventListItem } from "./CalendarEventListItem";
import { ListMoreEventsButton } from "./buttons/ListMoreEventsButton";

const MAX_LIST_ITEMS = 3;

const useStyles = makeStyles((theme) => ({
  eventListItem: {
    margin: 0,
    padding: 0,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  eventListItemText: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
}));

function CalendarEventList({ date }) {
  const classes = useStyles();
  const { getCalendarEvents } = useContext(CalendarContext);

  const slotEvents = getCalendarEvents(date, "day");

  const renderEvents = () => {
    let slotsJsx = slotEvents.map((event, i) => {
      return i < MAX_LIST_ITEMS ? (
        <CalendarEventListItem event={event} key={i} />
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

CalendarEventList.propTypes = {
  date: PropTypes.instanceOf(moment).isRequired,
};

export { CalendarEventList };
