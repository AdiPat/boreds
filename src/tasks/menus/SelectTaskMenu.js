import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Divider } from "@material-ui/core";
import { StyledMenu } from "../../components/menus/StyledMenu";
import { SelectTaskMenuItem } from "./SelectTaskMenuItem";
import { SelectTaskMenuHeader } from "./SelectTaskMenuHeader";
import TasksContext from "../../providers/TasksContext";

function SelectTaskMenu(props) {
  const [tasks, setTasks] = useState({});
  const context = useContext(TasksContext);

  useEffect(() => {
    const isMenuOpen = props.anchorEl !== null;
    if (isMenuOpen) {
      context.forceProviderUpdate();
      setTasks(context.state.tasks);
    }
  }, [props.anchorEl]);

  let renderMenu = () => {
    let menuJsx = [];
    const tasksLen = tasks ? Object.keys(tasks).length : 0;

    if (tasksLen) {
      menuJsx = Object.keys(tasks).map((taskId) => {
        return (
          <SelectTaskMenuItem
            key={taskId}
            taskId={taskId}
            text={tasks[taskId].title}
            handleCloseMenu={props.handleClose}
          />
        );
      });
    } else {
      menuJsx.push(<SelectTaskMenuItem key="empty" text="You have no tasks" />);
    }
    return menuJsx;
  };

  return (
    <div>
      <StyledMenu
        id="customized-menu"
        anchorEl={props.anchorEl}
        keepMounted
        open={Boolean(props.anchorEl)}
        onClose={props.handleClose}
      >
        <SelectTaskMenuHeader title="Your Tasks" />
        <Divider />
        {renderMenu()}
      </StyledMenu>
    </div>
  );
}

SelectTaskMenu.propTypes = {
  anchorEl: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.oneOf([null]),
    PropTypes.element,
    PropTypes.object,
  ]).isRequired,
  handleClose: PropTypes.func.isRequired,
};

export { SelectTaskMenu };
