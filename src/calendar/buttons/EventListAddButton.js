import React, { useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, ListItem, ListItemText, Button } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { CalendarUIContext } from "../CalendarUIContext";

const useStyles = makeStyles((theme) => ({
  emptyListItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    margin: 0,
    padding: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
}));

function EventListAddButton({ date }) {
  const classes = useStyles();
  const { createEventModal } = useContext(CalendarUIContext);

  const handleClick = () => {
    createEventModal.show(date);
  };

  return (
    <React.Fragment>
      <ListItem key={1} className={classes.emptyListItem} disableTouchRipple>
        <ListItemText
          disableTypography
          primary={<Typography variant="body1">No events.</Typography>}
        />
        <Button
          size="small"
          variant="contained"
          color="secondary"
          endIcon={<AddCircleOutlineIcon />}
          onClick={handleClick}
        >
          Add Event
        </Button>
      </ListItem>
    </React.Fragment>
  );
}

EventListAddButton.propTypes = {
  date: PropTypes.instanceOf(moment).isRequired,
};

export { EventListAddButton };
