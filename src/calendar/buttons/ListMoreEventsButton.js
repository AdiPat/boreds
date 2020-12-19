import { useContext, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { ListItem, ListItemText, Typography } from "@material-ui/core";
import { CalendarUIContext } from "../CalendarUIContext";

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
    fontSize: 12,
    fontWeight: "bold",
  },
}));

function ListMoreEventsButton({ extraEventsCount, key, date }) {
  const classes = useStyles();
  const { eventListPopover } = useContext(CalendarUIContext);

  const handleClick = (e) => {
    eventListPopover.show(e, date);
  };

  return (
    <ListItem
      key={key}
      button
      className={classes.eventListItem}
      onClick={handleClick}
    >
      <ListItemText
        disableTypography
        primary={
          <Typography variant="subtitle2" className={classes.eventListItemText}>
            {extraEventsCount} more
          </Typography>
        }
      />
    </ListItem>
  );
}

ListMoreEventsButton.propTypes = {
  date: PropTypes.instanceOf(moment),
  extraEventsCount: PropTypes.number.isRequired,
  key: PropTypes.number.isRequired,
};

export { ListMoreEventsButton };
