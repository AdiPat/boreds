import PropTypes from "prop-types";
import { useHistory } from "react-router";
import { StyledMenuItem } from "../../components/menus/StyledMenuItem";
import { ListItemText } from "@material-ui/core";

function SelectTaskMenuItem(props) {
  const history = useHistory();
  const handleClick = () => {
    props.handleCloseMenu();
    history.push(`/tasks/${props.taskId}`);
  };

  return (
    <StyledMenuItem button key={props.taskId} onClick={handleClick}>
      <ListItemText style={{ textAlign: "center" }}>{props.text}</ListItemText>
    </StyledMenuItem>
  );
}

SelectTaskMenuItem.propTypes = {
  taskId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  handleCloseMenu: PropTypes.func.isRequired,
  // selectTask: PropTypes.func.isRequired,
};

export { SelectTaskMenuItem };
