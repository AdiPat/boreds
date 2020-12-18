import { grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { SlotDateSelectButton } from "./buttons/SlotDateSelectButton";
import { CalendarEventList } from "./CalendarEventList";

const useStyles = makeStyles((theme) => ({
  monthSlot: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    borderBottom: "1px solid lightgrey",
    borderRight: "1px solid lightgrey",
    "&:first-child": {
      borderLeft: "1px solid lightgrey",
    },
    flexGrow: "1",
    flexBasis: "0",
    minHeight: theme.spacing(20),
  },
  monthSlotHeader: {
    textAlign: "center",
  },

  monthSlotBody: {
    flex: "1",
    "&:hover": {
      backgroundColor: grey[200],
      cursor: "pointer",
    },
  },
}));

function CalendarMonthSlot({ date }) {
  const classes = useStyles();

  return (
    <div className={classes.monthSlot}>
      <div className={classes.monthSlotHeader}>
        <SlotDateSelectButton date={date} size="small" />
      </div>
      <div className={classes.monthSlotBody}>
        <CalendarEventList date={date} />
      </div>
    </div>
  );
}

export { CalendarMonthSlot };
