import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { BoardList } from "./BoardList";
import { CircularLoader } from "../components/CircularLoader";
import { NoBoardAction } from "./NoBoardAction";

const useStyles = makeStyles((theme) => ({
  dashGrid: {
    marginLeft: "10px",
    padding: "20px",
  },
  dashItem: {
    display: "flex",
    alignItems: "center",
  },
  dashItemIcon: {
    color: "#000000",
  },
  dashItemTitle: {
    marginLeft: theme.spacing(1),
    //textTransform: "uppercase",
    color: "#000000",
    fontWeight: 600,
  },
}));

function DashPane(props) {
  const classes = useStyles();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500);
  });

  return (
    <Grid container alignItems="center" className={classes.dashGrid}>
      <Grid item xs={12}>
        <div className={classes.dashItem}>
          {React.cloneElement(props.icon, { className: classes.dashItemIcon })}
          <Typography className={classes.dashItemTitle} variant="h6">
            {props.paneTitle}
          </Typography>
        </div>
      </Grid>
      {isLoaded ? (
        <BoardList
          loadDeleteModal={props.loadDeleteModal}
          boardsList={props.paneBoards}
        ></BoardList>
      ) : (
        <CircularLoader loaderHeight="100px" color="primary" />
      )}
      {!Object.keys(props.paneBoards).length && props.showNoBoards ? (
        <NoBoardAction />
      ) : null}
    </Grid>
  );
}

DashPane.propTypes = {
  paneTitle: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  paneBoards: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  loadDeleteModal: PropTypes.func.isRequired,
  showNoBoards: PropTypes.bool,
};

DashPane.defaultProps = {
  paneBoards: {},
  showNoBoards: false,
};

export { DashPane };
