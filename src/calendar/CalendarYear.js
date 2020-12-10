import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import CalendarContext from "../providers/CalendarContext";
import { CalendarYearMonth } from "./CalendarYearMonth";

function CalendarYear() {
  const { months } = useContext(CalendarContext);

  const renderMonths = () => {
    let monthsJsx = months.map((month) => <CalendarYearMonth month={month} />);
    return monthsJsx;
  };

  return <Grid container>{renderMonths()}</Grid>;
}

export { CalendarYear };
