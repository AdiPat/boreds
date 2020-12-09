import PropTypes from "prop-types";
import { useState, useRef, useContext, useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { TimeDurationMenu } from "../menus/TimeDurationMenu";
import CONSTANTS from "../../utils/constants";
import CalendarContext from "../../providers/CalendarContext";

function TimeDurationButton(props) {
  const theme = useTheme();
  const { state, setCalendarDuration } = useContext(CalendarContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [timeOption, setTimeOption] = useState(
    CONSTANTS.CALENDAR.DURATIONS_TEXT.week
  );
  const btnRef = useRef(null);
  const isLoggedIn = Boolean(props.userId);

  const selectTime = (timeId) => {
    const selectedDuration = CONSTANTS.CALENDAR.DURATIONS[timeId];
    setCalendarDuration(selectedDuration);
  };

  useEffect(() => {
    const btnText = CONSTANTS.CALENDAR.DURATIONS_TEXT[state.duration];
    setTimeOption(btnText);
  }, [state.duration]);

  const openMenu = (e) => {
    setAnchorEl(btnRef.current);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return isLoggedIn ? (
    <div
      ref={btnRef}
      style={{ marginLeft: "auto", marginRight: theme.spacing(4) }}
    >
      <Button
        style={{ marginLeft: "auto", color: "black", backgroundColor: "white" }}
        size="large"
        onClick={openMenu}
      >
        <span>{timeOption}</span>
        <ArrowDropDownIcon />
      </Button>
      <TimeDurationMenu
        anchorEl={anchorEl}
        handleClose={closeMenu}
        selectTime={selectTime}
        timeOptions={CONSTANTS.CALENDAR.DURATIONS_TEXT}
      />
    </div>
  ) : null;
}

TimeDurationButton.propTypes = {
  userId: PropTypes.string.isRequired,
};

TimeDurationButton.defaultProps = {
  userId: undefined,
};

export { TimeDurationButton };
