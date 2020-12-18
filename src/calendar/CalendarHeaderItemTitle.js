import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";

function CalenderHeaderItemTitle({ title }) {
  return (
    <Typography style={{ textTransform: "uppercase" }} variant="subtitle1">
      {title}
    </Typography>
  );
}

CalenderHeaderItemTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export { CalenderHeaderItemTitle };
