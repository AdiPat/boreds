import PropTypes from "prop-types";
import { IconButton } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

function CloseDrawerButton(props) {
  const theme = useTheme();
  return (
    <IconButton onClick={props.handleDrawerClose}>
      {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
    </IconButton>
  );
}

CloseDrawerButton.propTypes = {
  handleDrawerClose: PropTypes.func.isRequired,
};

export { CloseDrawerButton };
