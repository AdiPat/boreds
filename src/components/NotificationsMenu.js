import React, { useState, useEffect } from "react";
import { withStyles, useTheme } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import LockIcon from "@material-ui/icons/Lock";
import PublicIcon from "@material-ui/icons/Public";
import { Typography } from "@material-ui/core";
import { getBoardTitle } from "../services/board";

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

function NotificationsMenu(props) {
  const theme = useTheme();

  const renderMenu = (invites) => {
    console.log("renderMenu: invites ", invites);
    let menu = [];
    if (invites) {
      menu = Object.keys(invites).map((inviteKey) => {
        const inviteObj = invites[inviteKey];
        //const boardTitle = await getBoardTitle(inviteObj.boardId);
        return (
          <div>
            <MenuItem
              button
              style={{ padding: theme.spacing(2), whiteSpace: "normal" }}
            >
              <Typography variant="body1">
                <strong>{inviteObj.from}</strong> has invited you to collaborate
                on board <strong>{inviteObj.boardId}</strong>
              </Typography>
            </MenuItem>
            <Divider />
          </div>
        );
      });
    }
    return menu;
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
          <Typography variant="h6">
            <strong>Invites</strong>
          </Typography>
        </div>
        <Divider />
        {renderMenu(props.invites)}
      </StyledMenu>
    </div>
  );
}

export { NotificationsMenu };
