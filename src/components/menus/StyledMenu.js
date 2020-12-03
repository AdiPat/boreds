import { Menu } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={props.elevation}
    getContentAnchorEl={null}
    anchorOrigin={props.anchorOrigin}
    transformOrigin={props.transformOrigin}
    {...props}
  />
));

StyledMenu.propTypes = {
  elevation: PropTypes.number,
  anchorOrigin: PropTypes.object,
  transformOrigin: PropTypes.object,
};

StyledMenu.defaultProps = {
  // menu opens at the bottom with anchor at center
  elevation: 0,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center",
  },
};

export { StyledMenu };
