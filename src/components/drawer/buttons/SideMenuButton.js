import PropTypes from "prop-types";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@material-ui/core";

function SideMenuButton(props) {
  return (
    <Tooltip title={props.openDrawer ? "" : props.text} placement="right">
      <ListItem
        ref={props.btnRef}
        button
        key={props.btnKey}
        onClick={props.clickHandler}
      >
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText primary={props.text} />
      </ListItem>
    </Tooltip>
  );
}

SideMenuButton.propTypes = {
  btnKey: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  btnRef: PropTypes.object,
  openDrawer: PropTypes.bool,
};

SideMenuButton.defaultProps = {
  openDrawer: false,
};

export { SideMenuButton };
