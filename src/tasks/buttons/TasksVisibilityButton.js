import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "@material-ui/core/styles";
import { Button, Typography, useMediaQuery } from "@material-ui/core";
import PublicIcon from "@material-ui/icons/Public";
import LockIcon from "@material-ui/icons/Lock";
import { TasksVisibilityMenu } from "../menus/TasksVisibilityMenu";
import {
  attachTaskVisibilityListener,
  detachTaskVisibilityListener,
} from "../../services/tasks";

function TasksVisibilityButton(props) {
  const [publicStatus, setPublicStatus] = useState(null);
  const [publicRef, setPublicRef] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const btnRef = useRef(null);
  const theme = useTheme();
  const mediaQueryBelowXs = useMediaQuery(theme.breakpoints.down("xs"));

  const updateVisibility = (status, ref) => {
    setPublicStatus(status);
    setPublicRef(ref);
  };

  useEffect(() => {
    if (props.taskId && !publicRef) {
      attachTaskVisibilityListener(props.taskId, updateVisibility);
    }

    return function cleanup() {
      if (publicRef) {
        detachTaskVisibilityListener(publicRef);
      }
    };
  }, [props.taskId]);

  const openMenu = (event) => {
    setAnchorEl(btnRef.current);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return props.taskId ? (
    <div>
      <Button
        variant="outlined"
        color="primary"
        style={{ marginRight: "16px" }}
        onClick={openMenu}
        ref={btnRef}
      >
        {publicStatus ? (
          <PublicIcon style={{ marginRight: theme.spacing(1) }} />
        ) : (
          <LockIcon style={{ marginRight: theme.spacing(1) }} />
        )}
        {!mediaQueryBelowXs ? (
          <Typography variant="body1">
            {publicStatus ? "Public" : "Private"}
          </Typography>
        ) : null}
      </Button>
      <TasksVisibilityMenu
        anchorEl={anchorEl}
        handleClose={closeMenu}
        userId={props.userId}
        taskId={props.taskId}
      />
    </div>
  ) : null;
}

TasksVisibilityButton.propTypes = {
  userId: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
};

TasksVisibilityButton.defaultProps = {
  userId: null,
  taskId: undefined,
};

export { TasksVisibilityButton };
