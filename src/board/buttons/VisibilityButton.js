import PropTypes from "prop-types";
import { useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import { Button, Typography, useMediaQuery } from "@material-ui/core";
import PublicIcon from "@material-ui/icons/Public";
import LockIcon from "@material-ui/icons/Lock";
import { VisibilityMenu } from "../VisibilityMenu";

function VisibilityButton(props) {
  const [visibilityMenuAnchorEl, setVisibilitMenuAnchorEl] = useState(null);
  const theme = useTheme();
  const mediaQueryBelowXs = useMediaQuery(theme.breakpoints.down("xs"));

  const openVisbilityMenu = (event) => {
    setVisibilitMenuAnchorEl(event.target);
  };

  const closeVisibilityMenu = () => {
    setVisibilitMenuAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        style={{ marginRight: "16px" }}
        onClick={openVisbilityMenu}
      >
        {props.public ? (
          <PublicIcon style={{ marginRight: theme.spacing(1) }} />
        ) : (
          <LockIcon style={{ marginRight: theme.spacing(1) }} />
        )}
        {!mediaQueryBelowXs ? (
          <Typography variant="body1">
            {props.public ? "Public" : "Private"}
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
  );
}

VisibilityButton.propTypes = {
  public: PropTypes.bool.isRequired,
};

export { VisibilityButton };
