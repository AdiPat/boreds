import { useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import CalendarContext from "../providers/CalendarContext";

function CalendarEventList({ date }) {
  const { getCalendarEvents } = useContext(CalendarContext);

  const slotEvents = getCalendarEvents(date, "day");

  return (
    <List>
      {slotEvents.map((event, i) => {
        return (
          <ListItem key={i} button>
            <ListItemText
              disableTypography
              primary={
                <Typography variant="subtitle2">
                  {event.startTime.format("hh:mm A")}, {event.title}
                </Typography>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
}

CalendarEventList.propTypes = {
  date: PropTypes.instanceOf(moment).isRequired,
};

export { CalendarEventList };
