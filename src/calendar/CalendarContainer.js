import React, { useState } from "react";
import PropTypes from "prop-types";
import { AppDrawer } from "../components/drawer/AppDrawer";
import { CalendarContent } from "./CalendarContent";
import { CalendarTopBar } from "./CalendarTopBar";
import CalendarProvider from "../providers/CalendarProvider";

function CalendarContainer(props) {
  const userId = props.user.uid;
  return (
    <CalendarProvider userId={userId}>
      <React.Fragment>
        <AppDrawer
          dashTitle="Calendar"
          userId={userId}
          topButtons={<CalendarTopBar userId={userId} />}
        />
        <CalendarContent userId={userId} />
      </React.Fragment>
    </CalendarProvider>
  );
}

CalendarContainer.propTypes = {
  user: PropTypes.object.isRequired,
};

CalendarContainer.defaultProps = {
  userId: null,
};

export { CalendarContainer };
