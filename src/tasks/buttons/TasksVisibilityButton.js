import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
import { Button, Typography, useMediaQuery } from "@material-ui/core";
import PublicIcon from "@material-ui/icons/Public";
import LockIcon from "@material-ui/icons/Lock";

function TasksVisibilityButton(props) {
  const [remountCount, setRemountCount] = useState(0);
  const [publicStatus, setPublicStatus] = useState(null);
  const [visibilityMenuAnchorEl, setVisibilitMenuAnchorEl] = useState(null);
  const theme = useTheme();
  const mediaQueryBelowXs = useMediaQuery(theme.breakpoints.down("xs"));

  const forceUpdate = () => {
    setRemountCount(remountCount + 1);
  };

  useEffect(() => {
    // isTaskPublic(props.boardId).then((status) => setPublicStatus(status));
  }, [remountCount]);

  const openVisbilityMenu = (event) => {
    setVisibilitMenuAnchorEl(event.target);
  };

  const closeVisibilityMenu = () => {
    setVisibilitMenuAnchorEl(null);
    forceUpdate();
  };

  return publicStatus !== null ? (
    <div>
      <Button
        variant="outlined"
        color="primary"
        style={{ marginRight: "16px" }}
        onClick={openVisbilityMenu}
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
      {/* TODO: Add TasksVisibilityMenu */}
    </div>
  ) : null;
}

TasksVisibilityButton.propTypes = {
  userId: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.oneOf([null]).isRequired,
  ]).isRequired,
  taskId: PropTypes.string.isRequired,
  public: PropTypes.bool.isRequired,
};

export { TasksVisibilityButton };
