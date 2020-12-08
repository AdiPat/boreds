import { useContext, useEffect } from "react";
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

const getHeaderHeight = () => {
  const header = document.getElementById(CONSTANTS.CALENDAR.IDS.calendarHeader);
  return header.offsetHeight + "px";
};

function CalendarHeader({ setOffset }) {
  const classes = useStyles();
  const theme = useTheme();
  const context = useContext(CalendarContext);
  const selectedDate = context.selectedDate;

  useEffect(() => {
    const offsetHeight = getHeaderHeight();
    setOffset(offsetHeight);
  }, []);

  const renderDates = () => {
    const week = context.getCurrentWeek();
    const weekJsx = week.map((dt) => {
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
    >
      {renderDates()}
    </div>
  );
}

export { CalendarHeader };
