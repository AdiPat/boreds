import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Grid } from "@material-ui/core";
import { getMonthsInYear } from "../../services/calendar";
import { YearMonth } from "./YearMonth";

const useStyles = makeStyles((theme) => ({
  hide: {
    display: "none !important",
  },
}));

function Year({ selectedDate, show }) {
  const classes = useStyles();

  const renderMonths = () => {
    const months = getMonthsInYear(selectedDate.year());
    let monthsJsx = months.map((month) => <YearMonth month={month} />);
    return monthsJsx;
  };

  return (
    <Grid className={clsx({ [classes.hide]: !show })} container>
      {renderMonths()}
    </Grid>
  );
}

Year.propTypes = {
  selectedDate: PropTypes.instanceOf(moment).isRequired,
  show: PropTypes.bool.isRequired,
};

Year.defaultProps = {
  selectedDate: moment(),
  show: false,
};

export { Year };
