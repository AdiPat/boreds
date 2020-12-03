import PropTypes from "prop-types";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

function SideMenuButton(props) {
  return (
    <ListItem
      ref={props.btnRef}
      button
      key={props.btnKey}
      onClick={props.clickHandler}
    >
      <ListItemIcon>{props.icon}</ListItemIcon>
      <ListItemText primary={props.text} />
    </ListItem>
  );
}

SideMenuButton.propTypes = {
  btnKey: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  btnRef: PropTypes.object,
};

export { SideMenuButton };
