import { useContext } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
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
  const history = useHistory();
  const classes = useStyles();
  const { selectDateNow, duration } = useContext(CalendarContext);

  const handleClick = (e) => {
    selectDateNow();
    history.push(`/calendar/${duration}/${moment().format("YYYY/MM/DD")}`);
  };

  return (
    <Button
      className={classes.btnToday}
      size="large"
      variant="contained"
      disableFocusRipple
      onClick={handleClick}
    >
      Today
    </Button>
  );
}

export { TodayButton };
