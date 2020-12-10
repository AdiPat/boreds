import { useContext } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CalendarContext from "../../providers/CalendarContext";

const useStyles = makeStyles((theme) => ({
  btnToday: {
    marginLeft: theme.spacing(2),
    color: "black",
    backgroundColor: "white",
    textTransform: "uppercase",
  },
}));

function TodayButton() {
  const classes = useStyles();
  const { selectDateNow } = useContext(CalendarContext);

  return (
    <Button
      className={classes.btnToday}
      size="large"
      variant="contained"
      disableFocusRipple
      onClick={selectDateNow}
    >
      Today
    </Button>
  );
}

export { TodayButton };
