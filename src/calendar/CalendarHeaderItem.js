import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { grey, deepOrange } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { CalenderHeaderItemTitle } from "./CalendarHeaderItemTitle";
import { CalendarHeaderItemBody } from "./CalendarHeaderItemBody";

const useStyles = makeStyles((theme) => ({
  hide: {
    display: "none !important",
  },
  avatarOrange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  headerItemContainer: {
    display: "flex",
    borderWidth: "1px 1px 1px 0",
    borderStyle: "solid",
    borderColor: grey[300],
    "&:first-of-type": {
      border: "1px solid",
      borderColor: grey[300],
    },
    flexGrow: "1",
    flexBasis: "0",
    justifyContent: "center",
    alignItems: "center",
  },
  headerItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: theme.spacing(2),
  },
}));

function CalendarHeaderItem({ date, isDateSelected, isDuration }) {
  const classes = useStyles();
  return (
    <div className={classes.headerItemContainer}>
      <div className={classes.headerItem}>
        <CalenderHeaderItemTitle title={date.format("ddd")} />
        <CalendarHeaderItemBody
          date={date}
          isDateSelected={isDateSelected}
          isDuration={isDuration}
        />
      </div>
    </div>
  );
}

CalendarHeaderItem.propTypes = {
  date: PropTypes.instanceOf(moment).isRequired,
  isDuration: PropTypes.object.isRequired,
  isDateSelected: PropTypes.bool.isRequired,
};

export { CalendarHeaderItem };
