import PropTypes from "prop-types";
import { useState, useRef } from "react";
import { useTheme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { TimeDurationMenu } from "../menus/TimeDurationMenu";
import CONSTANTS from "../../utils/constants";

function TimeDurationButton(props) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [timeOption, setTimeOption] = useState(
    CONSTANTS.CALENDAR.TIME_OPTIONS.week
  );
  const btnRef = useRef(null);
  const isLoggedIn = Boolean(props.userId);

  const selectTime = (timeId) => {
    setTimeOption(CONSTANTS.CALENDAR.TIME_OPTIONS[timeId]);
  };

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
        timeOptions={CONSTANTS.CALENDAR.TIME_OPTIONS}
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
