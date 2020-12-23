import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    paddingRight: 0,
    paddingLeft: 0,
    marginLeft: theme.spacing(11),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(10),
    alignItems: "flex-start",
    ["@media (max-width: 400px)"]: {
      marginLeft: theme.spacing(7),
    },
  },
}));

function TablesContent() {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <h1>Welcome to Tables</h1>
    </main>
  );
}

export { TablesContent };
