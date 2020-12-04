import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    paddingRight: 0,
    paddingLeft: 0,
    marginLeft: theme.spacing(10),
    marginTop: theme.spacing(8),
    alignItems: "flex-start",
    ["@media (max-width: 400px)"]: {
      marginLeft: theme.spacing(7),
    },
  },
}));

function CalendarContent(props) {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <p>
        Welcome to Boreds Calendar! <br /> <br />
        <code>userId = {props.userId}</code>
      </p>
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
