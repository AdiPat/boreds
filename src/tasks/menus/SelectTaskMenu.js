import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Divider } from "@material-ui/core";
import { StyledMenu } from "../../components/menus/StyledMenu";
import { SelectTaskMenuItem } from "./SelectTaskMenuItem";
import { SelectTaskMenuHeader } from "./SelectTaskMenuHeader";

const TASKS = {
  hello123: {
    id: "hello123",
    title: "Hello World",
  },
  abc1: {
    id: "abc1",
    title: "Work",
  },
  xjhiwd1: {
    id: "xjhiwd1",
    title: "Play",
  },
};

function SelectTaskMenu(props) {
  const [tasks, setTasks] = useState({});

  useEffect(() => {
    // TODO: Replace with API call
    setTasks(TASKS);
  }, [tasks]);

  let renderMenu = () => {
    let menuJsx = [];
    const tasksLen = tasks ? Object.keys(tasks).length : 0;

    if (tasksLen) {
      menuJsx = Object.keys(tasks).map((taskId) => {
        return <SelectTaskMenuItem key={taskId} text={tasks[taskId].title} />;
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
  tasksId: PropTypes.string.isRequired,
};

export { SelectTaskMenu };
