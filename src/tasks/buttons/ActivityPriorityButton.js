import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { ActivityPriorityMenu } from "../menus/ActivityPriorityMenu";

function ActivityPriorityButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const btnRef = useRef(null);

  const openMenu = (e) => {
    setAnchorEl(btnRef.current);
  };

  const closeMenu = (e) => {
    setAnchorEl(null);
  };

  const handleClick = (e) => {
    openMenu(e);
  };

  return (
    <div>
      <Button
        ref={btnRef}
        variant="contained"
        size="small"
        color="primary"
        onClick={handleClick}
      >
        <span style={{ fontSize: 10 }}>Priority</span>
        <ArrowDropDownIcon />
      </Button>
      <ActivityPriorityMenu anchorEl={anchorEl} handleClose={closeMenu} />
    </div>
  );
}

ActivityPriorityButton.propTypes = {
  taskId: PropTypes.string.isRequired,
  activityId: PropTypes.string.isRequired,
};

ActivityPriorityButton.defaultProps = {
  taskId: null,
  activityId: null,
};

export { ActivityPriorityButton };
