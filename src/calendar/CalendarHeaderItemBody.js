import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import clsx from "clsx";
import { deepOrange } from "@material-ui/core/colors";
import { Typography, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  hide: {
    display: "none !important",
  },
  avatarOrange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));

function CalendarHeaderItemBody({ date, isDuration, isDateSelected }) {
  const classes = useStyles();

  return (
    <div
      className={clsx({
        [classes.hide]: isDuration.year || isDuration.month,
      })}
    >
      <Avatar
        className={clsx(classes.avatarOrange, {
          [classes.hide]: !isDateSelected,
        })}
      >
        {date.format("DD")}
      </Avatar>
      <Typography
        className={clsx({ [classes.hide]: isDateSelected })}
        variant="h6"
      >
        {date.format("DD")}
      </Typography>
    </div>
  );
}

CalendarHeaderItemBody.propTypes = {
  date: PropTypes.instanceOf(moment).isRequired,
  isDuration: PropTypes.object.isRequired,
  isDateSelected: PropTypes.bool.isRequired,
};

export { CalendarHeaderItemBody };
