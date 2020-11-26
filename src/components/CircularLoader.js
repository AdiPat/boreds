import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  loaderContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
}));

function CircularLoader(props) {
  const classes = useStyles();
  return (
    <div
      className={classes.loaderContainer}
      style={props.loaderHeight ? { height: props.loaderHeight } : null}
    >
      <CircularProgress color={props.color} />
    </div>
  );
}

CircularLoader.propTypes = {
  loaderHeight: PropTypes.number,
  color: PropTypes.string.isRequired,
};

CircularLoader.defaultProps = {
  color: "secondary",
};

export { CircularLoader };
