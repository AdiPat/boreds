import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { CONSTANTS } from "../../utils/constants";
import { CalendarHeaderItem } from "./HeaderItem";
import { getWeek, getNextFourDays } from "../../services/calendar";

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    display: "flex",
    width: "calc(100% - 80px)",
    marginLeft: "auto",
    marginRight: theme.spacing(2),
  },
}));

function CalendarHeader({ selectedDate, duration, isDuration }) {
  const classes = useStyles();
  const [dates, setDates] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    // set dates
    const _dates = getDates(duration);
    setDates(_dates);
  }, [duration, selectedDate]);

  const getDates = (_duration) => {
    let dates = [];
    if (isDuration.week || isDuration.month) {
      dates = getWeek(selectedDate);
    } else if (isDuration.fourdays) {
      dates = getNextFourDays(selectedDate);
    } else if (isDuration.day) {
      dates = [selectedDate];
    }
    return dates;
  };

  const renderDates = (dates) => {
    const weekJsx = dates.map((dt) => {
      return <CalendarHeaderItem date={dt} isDuration={isDuration} />;
    });
    return weekJsx;
  };

  return (
    <Paper
      id={CONSTANTS.CALENDAR.IDS.calendarHeader}
      className={classes.headerContainer}
      elevation={3}
    >
      {renderDates(dates)}
    </Paper>
  );
}

export { CalendarHeader };
