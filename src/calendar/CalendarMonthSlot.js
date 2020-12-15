import { grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  monthSlot: {
    boxSizing: "border-box",
    display: "flex",
    borderBottom: "1px solid lightgrey",
    borderRight: "1px solid lightgrey",
    "&:first-child": {
      borderLeft: "1px solid lightgrey",
    },
    flexGrow: "1",
    flexBasis: "0",
    justifyContent: "center",
    minHeight: theme.spacing(16),

    "&:hover": {
      backgroundColor: grey[200],
      cursor: "pointer",
    },
  },
}));

function CalendarMonthSlot({ day }) {
  const classes = useStyles();

  return (
    <div className={classes.monthSlot}>
      <Typography variant="subtitle1">{day.format("DD")}</Typography>
    </div>
  );
}

export { CalendarMonthSlot };
