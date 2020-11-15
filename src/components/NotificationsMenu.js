import React, { useState, useEffect } from "react";
import { withStyles, useTheme } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import PersonAddRoundedIcon from "@material-ui/icons/PersonAddRounded";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { green, red } from "@material-ui/core/colors";
import { Typography, IconButton } from "@material-ui/core";
import { getAllInviteNotifications, getAllInvites } from "../services/invite";
import { getCurrentUser } from "../services/user";

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
  const [invites, setInvites] = useState([]);

  const loadInvites = async () => {
    const userId = await getCurrentUser().uid;
    const allInvites = await getAllInviteNotifications(userId);
    console.log("All invites: ", allInvites);

    if (allInvites) {
      const inviteCount = allInvites.length;
      console.log("notifications count", inviteCount);
      setInvites(allInvites);
    }
  };

  useEffect(() => {
    loadInvites();
  }, []);

  const renderMenu = () => {
    console.log("renderMenu: invites ", invites);
    let menu = [];
    if (invites) {
      menu = Object.keys(invites).map((inviteKey) => {
        const inviteObj = invites[inviteKey];
        //const boardTitle = await getBoardTitle(inviteObj.boardId);
        return (
          <div>
            <MenuItem
              style={{
                display: "flex",
                flexDirection: "column",
                padding: theme.spacing(2),
                whiteSpace: "normal",
                alignItems: "flex-start",
                transitionDuration: "0s",
              }}
              disableTouchRipple={true}
            >
              <Typography variant="body1">
                <strong>{inviteObj.from}</strong> has invited you to collaborate
                on board <strong>{inviteObj.boardTitle}</strong>.
              </Typography>
              <div>
                <IconButton style={{ color: green[500] }}>
                  <CheckCircleOutlineRoundedIcon color="inherit" />
                </IconButton>
                <IconButton style={{ color: red[500] }}>
                  <CancelOutlinedIcon color="inherit" />
                </IconButton>
              </div>
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
          <PersonAddRoundedIcon style={{ marginRight: theme.spacing(1) }} />
          <Typography variant="h6">
            <strong>Invites</strong>
          </Typography>
        </div>
        <Divider />
        {renderMenu()}
      </StyledMenu>
    </div>
  );
}

export { NotificationsMenu };
