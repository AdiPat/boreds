import React, { useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Grid } from "@material-ui/core";
import CalendarContext from "../providers/CalendarContext";
import { CalendarYearMonth } from "./CalendarYearMonth";

const useStyles = makeStyles((theme) => ({
  hide: {
    display: "none !important",
  },
}));

function CalendarYear({ show }) {
  const classes = useStyles();
  const { months } = useContext(CalendarContext);

  const renderMonths = () => {
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
  show: PropTypes.bool.isRequired,
};

CalendarYear.defaultProps = {
  show: false,
};

export { CalendarYear };
