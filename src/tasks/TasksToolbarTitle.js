import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import { Typography, useMediaQuery } from "@material-ui/core";

function TasksToolbarTitle(props) {
  const theme = useTheme();
  const mediaQueryBelowXs = useMediaQuery(theme.breakpoints.down("xs"));

  return !mediaQueryBelowXs ? (
    <Typography type="h6" style={{ marginRight: theme.spacing(2) }}>
      <strong>{props.title}</strong>
    </Typography>
  ) : null;
}

TasksToolbarTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export { TasksToolbarTitle };
