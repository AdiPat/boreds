import { useContext } from "react";
import { Grid, Typography } from "@material-ui/core";
import CalendarContext from "../providers/CalendarContext";

function CalendarHeader(props) {
  const context = useContext(CalendarContext);

  const renderDates = () => {
    const week = context.getCurrentWeek();
    const weekJsx = week.map((dt) => {
      return (
        <div
          style={{
            display: "flex",
            //minWidth: "120px",
            border: "1px solid lightgrey",
            flexGrow: "1",
            flexBasis: "0",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              style={{ textTransform: "uppercase" }}
              variant="subtitle1"
            >
              {dt.format("ddd")}
            </Typography>
            <Typography variant="h6">{dt.format("DD")}</Typography>
          </div>
        </div>
      );
    });
    return weekJsx;
  };

  return (
    <div
      style={{
        display: "flex",
        width: "calc(100% - 80px)",
        marginLeft: "auto",
        marginRight: "16px",
      }}
    >
      {renderDates()}
    </div>
  );
}

export { CalendarHeader };
