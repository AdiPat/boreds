import PropTypes from "prop-types";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

function SideMenuButton(props) {
  return (
    <ListItem button key={props.key} onClick={props.clickHandler}>
      <ListItemIcon>{props.icon}</ListItemIcon>
      <ListItemText primary={props.text} />
    </ListItem>
  );
}

SideMenuButton.propTypes = {
  key: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
};

export { SideMenuButton };
