import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { CircularLoader } from "../components/CircularLoader";

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    paddingRight: 0,
    paddingLeft: 0,
    marginLeft: theme.spacing(11),
    marginTop: theme.spacing(2),
    alignItems: "flex-start",
    ["@media (max-width: 400px)"]: {
      marginLeft: theme.spacing(7),
    },
  },
}));

function TasksContent(props) {
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // dirty hack
    setTimeout(() => {
      if (!props.userId) {
        history.push("/login");
      } else {
        setIsLoggedIn(true);
      }
    }, 2000);
  }, []);

  return (
    <main className={classes.content}>
      {isLoggedIn ? (
        <div>
          <h1>Hello {props.userId} to Tasks!</h1>
        </div>
      ) : (
        <CircularLoader color="secondary" />
      )}
    </main>
  );
}

TasksContent.propTypes = {
  userId: PropTypes.oneOfType([
    PropTypes.string.isRequired, // authenticated user
    PropTypes.oneOf([null]).isRequired, // public task
  ]).isRequired,
};

export { TasksContent };