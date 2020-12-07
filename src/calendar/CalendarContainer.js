import React from "react";
import PropTypes from "prop-types";
import { AppDrawer } from "../components/drawer/AppDrawer";
import { CalendarContent } from "./CalendarContent";
import { TimeDurationButton } from "./buttons/TimeDurationButton";
import { DateButton } from "./buttons/DateButton";

function CalendarContainer(props) {
  const userId = props.user.uid;

  const drawerTopButtons = [
    <DateButton />,
    <TimeDurationButton userId={userId} />,
  ];

  return (
    <React.Fragment>
      <AppDrawer
        dashTitle="Calendar"
        userId={userId}
        topButtons={drawerTopButtons}
      />
      <CalendarContent userId={userId} />
    </React.Fragment>
  );
}

CalendarContainer.propTypes = {
  user: PropTypes.object.isRequired,
};

CalendarContainer.defaultProps = {
  userId: null,
};

export { CalendarContainer };
