import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
import { Button, Typography, useMediaQuery } from "@material-ui/core";
import PublicIcon from "@material-ui/icons/Public";
import LockIcon from "@material-ui/icons/Lock";
import { VisibilityMenu } from "../VisibilityMenu";
import { isBoardPublic } from "../../services/board";

function VisibilityButton(props) {
  const [remountCount, setRemountCount] = useState(0);
  const [publicStatus, setPublicStatus] = useState(null);
  const [visibilityMenuAnchorEl, setVisibilitMenuAnchorEl] = useState(null);
  const theme = useTheme();
  const mediaQueryBelowXs = useMediaQuery(theme.breakpoints.down("xs"));

  const forceUpdate = () => {
    setRemountCount(remountCount + 1);
  };

  useEffect(() => {
    isBoardPublic(props.boardId).then((status) => setPublicStatus(status));
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
      <VisibilityMenu
        handleClose={closeVisibilityMenu}
        anchorEl={visibilityMenuAnchorEl}
        userId={props.userId}
        boardId={props.boardId}
      />
    </div>
  ) : null;
}

VisibilityButton.propTypes = {
  userId: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.oneOf([null]).isRequired,
  ]).isRequired,
  boardId: PropTypes.string.isRequired,
  public: PropTypes.bool.isRequired,
};

export { VisibilityButton };
