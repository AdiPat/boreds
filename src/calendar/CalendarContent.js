import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import CalendarContext from "../providers/CalendarContext";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarTimeStrip } from "./CalendarTimeStrip";

const useStyles = makeStyles((theme) => ({
  content: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    paddingRight: 0,
    paddingLeft: 0,
    marginLeft: theme.spacing(8),
    marginTop: theme.spacing(9),
    alignItems: "flex-start",
    ["@media (max-width: 400px)"]: {
      marginLeft: theme.spacing(7),
    },
  },
}));

function CalendarContent(props) {
  const classes = useStyles();
  const [timeStripOffset, setTimeStripOffset] = useState(0);
  const context = useContext(CalendarContext);

  return (
    <main className={classes.content}>
      <CalendarTimeStrip duration="week" topOffset={timeStripOffset} />
      <CalendarHeader setOffset={setTimeStripOffset} />
    </main>
  );
}

CalendarContent.propTypes = {
  userId: PropTypes.string.isRequired,
};

CalendarContent.defaultProps = {
  userId: undefined,
};

export { CalendarContent };
