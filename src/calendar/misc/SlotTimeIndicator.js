import PropTypes from "prop-types";
import clsx from "clsx";
import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import CONSTANTS from "../../utils/constants";

const useStyles = makeStyles((theme) => ({
  divider: {
    position: "absolute",
    height: "2px",
    backgroundColor: red[500],
    width: "100%",
    "&::before": {
      position: "absolute",
      display: "block",
      content: '" "',
      height: "10px",
      width: "10px",
      left: "-5px",
      top: "-4px",
      borderRadius: "100%",
      backgroundColor: red[500],
    },
  },
  dividerStart: {
    top: "5%",
  },
  dividerQuarter: {
    top: "25%",
  },
  dividerMiddle: {
    top: "50%",
  },
  dividerThreeQuarter: {
    top: "75%",
  },
  dividerFull: {
    top: "99%",
  },
}));

function SlotTimeIndicator({ dividerFlags }) {
  const classes = useStyles();

  return (
    <span
      className={clsx(classes.divider, {
        [classes.dividerStart]: dividerFlags.start,
        [classes.dividerQuarter]: dividerFlags.quarter,
        [classes.dividerMiddle]: dividerFlags.middle,
        [classes.dividerThreeQuarter]: dividerFlags.threeQuarter,
        [classes.dividerFull]: dividerFlags.full,
      })}
    >
      {" "}
    </span>
  );
}

SlotTimeIndicator.propTypes = {
  dividerFlags: PropTypes.object.isRequired,
};

SlotTimeIndicator.defaultProps = {
  dividerFlags: CONSTANTS.CALENDAR.DAY_TIME_SLOT_FLAGS,
};

export { SlotTimeIndicator };
