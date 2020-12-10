import { useContext, useEffect, useState, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";
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
    border: "1px solid lightgrey",
    flexGrow: "1",
    flexBasis: "0",
    justifyContent: "center",
    alignItems: "center",
  },
  headerItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: theme.spacing(2),
  },
}));

function CalendarHeader({ setOffset, duration }) {
  const classes = useStyles();
  const [dates, setDates] = useState([]);
  const theme = useTheme();
  const headerContainerRef = useRef(null);

  const {
    state: { selectedDate },
    getCurrentWeek,
    getFourDays,
  } = useContext(CalendarContext);

  useEffect(() => {
    // set offset
    const offsetHeight = headerContainerRef.current.offsetHeight;
    setOffset(offsetHeight);
    // set dates
    const _dates = getDates(duration);
    setDates(_dates);
  }, [duration, headerContainerRef.current]);

  const getDates = (_duration) => {
    let dates = [];
    if (_duration === CONSTANTS.CALENDAR.DURATIONS.week) {
      dates = getCurrentWeek();
    } else if (_duration === CONSTANTS.CALENDAR.DURATIONS.fourdays) {
      dates = getFourDays();
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
            {isDateSelected ? (
              <Avatar className={classes.avatarOrange}>
                {dt.format("DD")}
              </Avatar>
            ) : (
              <Typography variant="h6">{dt.format("DD")}</Typography>
            )}
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
      ref={headerContainerRef}
    >
      {renderDates(dates)}
    </div>
  );
}

export { CalendarHeader };
