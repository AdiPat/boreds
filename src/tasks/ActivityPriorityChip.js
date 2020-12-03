import PropTypes from "prop-types";
import { Chip } from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { red, yellow, green, grey } from "@material-ui/core/colors";

const PRIORITIES = {
  high: "high",
  medium: "medium",
  low: "low",
  none: "none",
};

const useStyles = makeStyles((theme) => ({
  priorityChip: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  highPriorityChip: {
    backgroundColor: red[500],
    color: grey[50],
  },
  mediumPriorityChip: {
    backgroundColor: yellow[500],
    color: grey[900],
  },
  lowPriorityChip: {
    backgroundColor: green[500],
    color: grey[50],
  },
}));

function ActivityPriorityChip(props) {
  const classes = useStyles();
  const isPriorityValid =
    Object.values(PRIORITIES).filter((pr) => pr === props.priority).length > 0;

  return isPriorityValid ? (
    <Chip
      label={props.priority}
      color={props.priority === PRIORITIES.none ? "primary" : ""}
      className={clsx(classes.priorityChip, {
        [classes.highPriorityChip]: props.priority === PRIORITIES.high,
        [classes.mediumPriorityChip]: props.priority === PRIORITIES.medium,
        [classes.lowPriorityChip]: props.priority === PRIORITIES.low,
      })}
    />
  ) : null;
}

ActivityPriorityChip.propTypes = {
  priority: PropTypes.string.isRequired,
};

ActivityPriorityChip.defaultProps = {
  priority: "none",
};

export { ActivityPriorityChip };
