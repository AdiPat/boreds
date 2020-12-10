import React from "react";
import PropTypes from "prop-types";
import { TimeDurationButton } from "./buttons/TimeDurationButton";
import { DateButton } from "./buttons/DateButton";
import { TodayButton } from "./buttons/TodayButton";

function CalendarTopBar(props) {
  return (
    <React.Fragment>
      <DateButton />
      <TodayButton />
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
