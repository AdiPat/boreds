import React from "react";
import PropTypes from "prop-types";
import { AppDrawer } from "../components/drawer/AppDrawer";
import { CalendarContent } from "./CalendarContent";

function CalendarContainer(props) {
  const userId = props.user.uid;
  return (
    <React.Fragment>
      <AppDrawer dashTitle="Calendar" userId={userId} />
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
