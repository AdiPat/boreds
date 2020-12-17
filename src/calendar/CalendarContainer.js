import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { AppDrawer } from "../components/drawer/AppDrawer";
import { CalendarContent } from "./CalendarContent";
import { CalendarTopBar } from "./CalendarTopBar";
import CalendarProvider from "../providers/CalendarProvider";

function CalendarContainer({ user, extras }) {
  const userId = user.uid;
  const history = useHistory();
  // console.log("CalendarContainer: ", extras);

  return (
    <CalendarProvider userId={userId} extras={extras} history={history}>
      <React.Fragment>
        <AppDrawer
          dashTitle="Calendar"
          userId={userId}
          topButtons={<CalendarTopBar userId={userId} />}
        />
        <CalendarContent userId={userId} extras={{}} />
      </React.Fragment>
    </CalendarProvider>
  );
}

CalendarContainer.propTypes = {
  user: PropTypes.object.isRequired,
  extras: PropTypes.array,
};

CalendarContainer.defaultProps = {
  userId: null,
  extras: [],
};

export { CalendarContainer };
