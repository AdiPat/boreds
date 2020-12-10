import React, { useContext, useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CalendarContext from "../providers/CalendarContext";
import CONSTANTS from "../utils/constants";
import { CalendarHeaderItem } from "./CalendarHeaderItem";

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    display: "flex",
    width: "calc(100% - 80px)",
    marginLeft: "auto",
    marginRight: theme.spacing(2),
  },
}));

function CalendarHeader({ duration, isDuration }) {
  const classes = useStyles();
  const [dates, setDates] = useState([]);
  const theme = useTheme();

  const {
    state: { selectedDate },
    getCurrentWeek,
    getFourDays,
  } = useContext(CalendarContext);

  useEffect(() => {
    // set dates
    const _dates = getDates(duration);
    setDates(_dates);
  }, [duration, selectedDate]);

  const getDates = (_duration) => {
    let dates = [];
    if (isDuration.week || isDuration.month) {
      dates = getCurrentWeek();
    } else if (isDuration.fourdays) {
      dates = getFourDays();
    } else if (isDuration.day) {
      dates = [selectedDate];
    }
    return dates;
  };

  const renderDates = (dates) => {
    const weekJsx = dates.map((dt) => {
      const isDateSelected = selectedDate.isSame(dt, "day");
      return (
        <CalendarHeaderItem
          date={dt}
          isDateSelected={isDateSelected}
          isDuration={isDuration}
        />
      );
    });
    return weekJsx;
  };

  return (
    <div
      id={CONSTANTS.CALENDAR.IDS.calendarHeader}
      className={classes.headerContainer}
    >
      {renderDates(dates)}
    </div>
  );
}

export { CalendarHeader };
