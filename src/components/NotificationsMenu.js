import React, { useState, useEffect } from "react";
import { withStyles, useTheme } from "@material-ui/core/styles";
import PersonAddRoundedIcon from "@material-ui/icons/PersonAddRounded";
import { Typography, Divider, Menu } from "@material-ui/core";
import { attachInvitesListener } from "../services/database";
import { getCurrentUser } from "../services/user";
import { NotificationsMenuItem } from "./NotificationsMenuItem";

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

  const updateInvitesInState = (invites) => {
    setInvites(invites);
    // props.setNotificationsCount(Object.keys(invites).length);
  };

  useEffect(() => {
    // loadInvites();
    const user = getCurrentUser();
    if (user) {
      const userId = getCurrentUser().uid;
      attachInvitesListener(userId, updateInvitesInState);
    }
  }, []);

  const renderMenu = () => {
    let menu = [];
    if (invites && invites.length) {
      menu = Object.keys(invites).map((inviteKey) => {
        const inviteObj = Object.assign({}, invites[inviteKey]);
        return (
          <NotificationsMenuItem
            key={inviteObj.id}
            emptyMessage={false}
            fromEmail={inviteObj.from}
            boardTitle={inviteObj.boardTitle}
            inviteId={inviteObj.id}
            inviteObj={inviteObj}
          />
        );
      });
    } else {
      menu.push(<NotificationsMenuItem key="empty" emptyMessage={true} />);
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
