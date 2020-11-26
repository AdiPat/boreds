import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Divider } from "@material-ui/core";
import { attachInvitesListener } from "../../services/database";
import { getCurrentUser } from "../../services/user";
import { NotificationsMenuHeader } from "./NotificationsMenuHeader";
import { NotificationsMenuItem } from "./NotificationsMenuItem";
import { StyledMenu } from "./StyledMenu";

function NotificationsMenu(props) {
  const [invites, setInvites] = useState([]);

  const updateInvitesInState = (invites) => {
    setInvites(invites);
  };

  useEffect(() => {
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
        <NotificationsMenuHeader headerTitle="Invites" />
        <Divider />
        {renderMenu()}
      </StyledMenu>
    </div>
  );
}

NotificationsMenu.propTypes = {
  anchorEl: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.oneOf([null]),
    PropTypes.element,
  ]).isRequired,
  handleClose: PropTypes.func.isRequired,
};

export { NotificationsMenu };
