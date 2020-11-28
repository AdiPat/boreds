import PropTypes from "prop-types";
import { StyledMenuItem } from "../../components/menus/StyledMenuItem";
import { ListItemText } from "@material-ui/core";

function SelectTaskMenuItem(props) {
  return (
    <StyledMenuItem>
      <ListItemText style={{ textAlign: "center" }}>{props.text}</ListItemText>
    </StyledMenuItem>
  );
}

SelectTaskMenuItem.propTypes = {
  text: PropTypes.string.isRequired,
};

export { SelectTaskMenuItem };
