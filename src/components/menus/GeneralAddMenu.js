import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import { StyledMenu } from "./StyledMenu";
import { AddBoardButton } from "../drawer/buttons/AddBoardButton";
import { AddTaskButton } from "../drawer/buttons/AddTaskButton";

function GeneralAddMenu(props) {
  const theme = useTheme();

  return (
    <div>
      <StyledMenu
        anchorEl={props.anchorEl}
        keepMounted
        open={Boolean(props.anchorEl)}
        onClose={props.handleClose}
        elevation={4}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        style={{ marginLeft: theme.spacing(2) }}
      >
        <AddBoardButton />
        <AddTaskButton handleCloseMenu={props.handleClose} />
      </StyledMenu>
    </div>
  );
}

GeneralAddMenu.propTypes = {
  anchorEl: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.oneOf([null]),
    PropTypes.element,
    PropTypes.object,
  ]).isRequired,
  handleClose: PropTypes.func.isRequired,
};

export { GeneralAddMenu };
