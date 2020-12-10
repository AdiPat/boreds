import React, { useContext, useEffect, useState, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { deepOrange, grey } from "@material-ui/core/colors";
import { Grid, Typography, Avatar } from "@material-ui/core";
import CalendarContext from "../providers/CalendarContext";
import CONSTANTS from "../utils/constants";

const useStyles = makeStyles((theme) => ({
  avatarOrange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  headerContainer: {
    display: "flex",
    width: "calc(100% - 80px)",
    marginLeft: "auto",
    marginRight: theme.spacing(2),
  },
  headerItemContainer: {
    display: "flex",
    //minWidth: "120px",
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

function CalendarHeader({ duration }) {
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
    if (
      _duration === CONSTANTS.CALENDAR.DURATIONS.week ||
      _duration === CONSTANTS.CALENDAR.DURATIONS.month
    ) {
      dates = getCurrentWeek();
    } else if (_duration === CONSTANTS.CALENDAR.DURATIONS.fourdays) {
      dates = getFourDays();
    } else if (_duration === CONSTANTS.CALENDAR.DURATIONS.day) {
      dates = [selectedDate];
    }
    return dates;
  };

  const renderDates = (dates) => {
    const weekJsx = dates.map((dt) => {
      const isDateSelected = selectedDate.isSame(dt, "day");
      return (
        <div className={classes.headerItemContainer}>
          <div className={classes.headerItem}>
            <Typography
              style={{ textTransform: "uppercase" }}
              variant="subtitle1"
            >
              {dt.format("ddd")}
            </Typography>
            {duration !== CONSTANTS.CALENDAR.DURATIONS.month &&
            duration !== CONSTANTS.CALENDAR.DURATIONS.year ? (
              <React.Fragment>
                {isDateSelected ? (
                  <Avatar className={classes.avatarOrange}>
                    {dt.format("DD")}
                  </Avatar>
                ) : (
                  <Typography variant="h6">{dt.format("DD")}</Typography>
                )}
              </React.Fragment>
            ) : null}
          </div>
        </div>
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
