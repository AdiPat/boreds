import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";

function DrawerAppBarTitle(props) {
  return (
    <Typography variant="h6" noWrap>
      Boreds {props.dashTitle}
    </Typography>
  );
}

DrawerAppBarTitle.propTypes = {
  dashTitle: PropTypes.string.isRequired,
};

DrawerAppBarTitle.defaultProps = {
  dashTitle: "",
};

export { DrawerAppBarTitle };
