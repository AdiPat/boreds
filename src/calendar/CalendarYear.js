import React, { useContext } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Grid } from "@material-ui/core";
import { getMonthsInYear } from "../services/calendar";
import { CalendarYearMonth } from "./CalendarYearMonth";

const useStyles = makeStyles((theme) => ({
  hide: {
    display: "none !important",
  },
}));

function CalendarYear({ selectedDate, show }) {
  const classes = useStyles();

  const renderMonths = () => {
    const months = getMonthsInYear(selectedDate.year());
    let monthsJsx = months.map((month) => <CalendarYearMonth month={month} />);
    return monthsJsx;
  };

  return (
    <Grid className={clsx({ [classes.hide]: !show })} container>
      {renderMonths()}
    </Grid>
  );
}

CalendarYear.propTypes = {
  selectedDate: PropTypes.instanceOf(moment).isRequired,
  show: PropTypes.bool.isRequired,
};

CalendarYear.defaultProps = {
  selectedDate: moment(),
  show: false,
};

export { CalendarYear };
