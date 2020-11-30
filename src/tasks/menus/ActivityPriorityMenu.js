import PropTypes from "prop-types";
import { ListItemText } from "@material-ui/core";
import { StyledMenu } from "../../components/menus/StyledMenu";
import { StyledMenuItem } from "../../components/menus/StyledMenuItem";

function ActivityPriorityMenu(props) {
  return (
    <div>
      <StyledMenu
        id="activity-priority-menu"
        anchorEl={props.anchorEl}
        keepMounted
        open={Boolean(props.anchorEl)}
        onClose={props.handleClose}
      >
        <StyledMenuItem key="high">
          <ListItemText>High</ListItemText>
        </StyledMenuItem>
        <StyledMenuItem key="medium">
          <ListItemText>Medium</ListItemText>
        </StyledMenuItem>
        <StyledMenuItem key="low">
          <ListItemText>Low</ListItemText>
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}

ActivityPriorityMenu.propTypes = {
  anchorEl: PropTypes.oneOfType([
    PropTypes.node.isRequired,
    PropTypes.oneOf([null]).isRequired,
    PropTypes.element.isRequired,
    PropTypes.object.isRequired,
  ]).isRequired,
  handleClose: PropTypes.func.isRequired,
};

ActivityPriorityMenu.defaultProps = {
  anchorEl: null,
};

export { ActivityPriorityMenu };
