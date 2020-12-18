import React, { useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import clsx from "clsx";
import { deepOrange, grey } from "@material-ui/core/colors";
import { Button, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CalendarContext from "../../providers/CalendarContext";

const useStyles = makeStyles((theme) => ({
  hide: {
    display: "none !important",
  },
  selectDateBtn: {
    "&:hover": {
      backgroundColor: "white",
    },
  },
  animateAvatar: {
    transition: "all 0.3s linear",
  },
  avatarOrange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  avatarWhite: {
    color: "black",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: grey[100],
    },
  },
}));

function SlotDateSelectButton({ date }) {
  const classes = useStyles();

  const { selectedDate, setSelectedDate } = useContext(CalendarContext);

  const isDateSelected =
    selectedDate.format("DD-MM-YYYY") === date.format("DD-MM-YYYY");

  const handleSelectDate = () => {
    setSelectedDate(date);
  };

  return (
    <Button
      className={classes.selectDateBtn}
      onClick={handleSelectDate}
      disableRipple
    >
      <Avatar
        className={clsx(classes.animateAvatar, {
          [classes.avatarOrange]: isDateSelected,
          [classes.avatarWhite]: !isDateSelected,
        })}
      >
        {date.format("DD")}
      </Avatar>
    </Button>
  );
}

SlotDateSelectButton.propTypes = {
  date: PropTypes.instanceOf(moment).isRequired,
  isDateSelected: PropTypes.bool.isRequired,
};

export { SlotDateSelectButton };
