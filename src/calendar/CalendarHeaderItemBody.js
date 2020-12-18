import React, { useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import clsx from "clsx";
import { deepOrange, grey } from "@material-ui/core/colors";
import { Button, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CalendarContext from "../providers/CalendarContext";

const useStyles = makeStyles((theme) => ({
  hide: {
    display: "none !important",
  },
  selectDateBtn: {
    "&:hover": {
      backgroundColor: "white",
    },
  },
  animate: {
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

function CalendarHeaderItemBody({ date, isDuration, isDateSelected }) {
  const classes = useStyles();
  const { setSelectedDate } = useContext(CalendarContext);

  const handleSelectDate = () => {
    setSelectedDate(date);
  };

  return (
    <div
      className={clsx({
        [classes.hide]: isDuration.year || isDuration.month,
      })}
    >
      <Button
        className={classes.selectDateBtn}
        onClick={handleSelectDate}
        disableRipple
      >
        <Avatar
          className={clsx(classes.animate, {
            [classes.avatarOrange]: isDateSelected,
            [classes.avatarWhite]: !isDateSelected,
          })}
        >
          {date.format("DD")}
        </Avatar>
      </Button>
    </div>
  );
}

CalendarHeaderItemBody.propTypes = {
  date: PropTypes.instanceOf(moment).isRequired,
  isDuration: PropTypes.object.isRequired,
  isDateSelected: PropTypes.bool.isRequired,
};

export { CalendarHeaderItemBody };
