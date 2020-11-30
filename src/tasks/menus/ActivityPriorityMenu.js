import PropTypes from "prop-types";
import { ListItemText } from "@material-ui/core";
import { StyledMenu } from "../../components/menus/StyledMenu";
import { StyledMenuItem } from "../../components/menus/StyledMenuItem";
import { setActivityPriority } from "../../services/tasks-activity";

const PRIORITIES = ["High", "Medium", "Low"];

function ActivityPriorityMenu(props) {
  const renderMenu = () => {
    const menuJsx = PRIORITIES.map((priority) => (
      <StyledMenuItem
        key={priority}
        button
        onClick={() => handlePriorityChange(priority.toLowerCase())}
      >
        <ListItemText>{priority}</ListItemText>
      </StyledMenuItem>
    ));
    return menuJsx;
  };

  const handlePriorityChange = (priority) => {
    setActivityPriority(props.taskId, props.activityId, priority);
    props.handleClose();
  };

  return (
    <div>
      <StyledMenu
        id="activity-priority-menu"
        anchorEl={props.anchorEl}
        keepMounted
        open={Boolean(props.anchorEl)}
        onClose={props.handleClose}
      >
        {renderMenu()}
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
  taskId: PropTypes.string.isRequired,
  activityId: PropTypes.string.isRequired,
};

ActivityPriorityMenu.defaultProps = {
  anchorEl: null,
  taskId: undefined,
  activityId: undefined,
};

export { ActivityPriorityMenu };
