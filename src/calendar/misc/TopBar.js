import React from "react";
import PropTypes from "prop-types";
import { TimeDurationButton } from "../buttons/TimeDurationButton";
import { DateButton } from "../buttons/DateButton";
import { TodayButton } from "../buttons/TodayButton";

function TopBar(props) {
  return (
    <React.Fragment>
      <DateButton />
      <TodayButton />
      <TimeDurationButton userId={props.userId} />
    </React.Fragment>
  );
}

TopBar.propTypes = {
  userId: PropTypes.string.isRequired,
};

TopBar.defaultProps = {
  userId: undefined,
};

export { TopBar };
