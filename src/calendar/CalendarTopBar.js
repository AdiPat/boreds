import React from "react";
import PropTypes from "prop-types";
import { TimeDurationButton } from "./buttons/TimeDurationButton";
import { DateButton } from "./buttons/DateButton";

function CalendarTopBar(props) {
  return (
    <React.Fragment>
      <DateButton />
      <TimeDurationButton userId={props.userId} />
    </React.Fragment>
  );
}

CalendarTopBar.propTypes = {
  userId: PropTypes.string.isRequired,
};

CalendarTopBar.defaultProps = {
  userId: undefined,
};

export { CalendarTopBar };
