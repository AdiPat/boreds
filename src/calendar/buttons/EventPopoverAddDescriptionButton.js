import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  hide: {
    display: "none",
  },
}));

function EventPopoverAddDescriptionButton({ onClick, show }) {
  const classes = useStyles();
  return (
    <Button
      onClick={onClick}
      className={clsx({
        [classes.hide]: show,
      })}
    >
      Add Description
    </Button>
  );
}

EventPopoverAddDescriptionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

EventPopoverAddDescriptionButton.defaultProps = {
  show: false,
};

export { EventPopoverAddDescriptionButton };
