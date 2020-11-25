import React from "react";
import PropTypes from "prop-types";
import { withStyles, useTheme } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import LockIcon from "@material-ui/icons/Lock";
import PublicIcon from "@material-ui/icons/Public";
import { Typography } from "@material-ui/core";
import { setBoardVisibility } from "../services/board";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

function VisibilityMenu(props) {
  const theme = useTheme();

  const handleVisibilityChange = (visibility) => {
    setBoardVisibility(props.userId, props.boardId, visibility);
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: theme.spacing(1),
          }}
        >
          <Typography variant="body1">
            <strong>Visibility</strong>
          </Typography>
        </div>
        <Divider />
        <MenuItem button onClick={() => handleVisibilityChange("public")}>
          <ListItemIcon>
            <PublicIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Public" />
        </MenuItem>
        <Divider />
        <MenuItem button onClick={() => handleVisibilityChange("private")}>
          <ListItemIcon>
            <LockIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Private" />
        </MenuItem>
      </StyledMenu>
    </div>
  );
}

VisibilityMenu.propTypes = {
  anchorEl: PropTypes.node.isRequired,
  userId: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export { VisibilityMenu };
