import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { SideMenuButton } from "./SideMenuButton";
import { GeneralAddMenu } from "../../menus/GeneralAddMenu";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";

function GeneralAddButton({ openDrawer }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const btnRef = useRef(null);

  const handleOpenMenu = (e) => {
    setAnchorEl(btnRef.current);
  };

  const handleCloseMenu = (e) => {
    setAnchorEl(null);
  };

  return (
    <div>
      <SideMenuButton
        btnKey="GeneralCreate"
        text="Quick Create"
        icon={<AddCircleRoundedIcon />}
        clickHandler={handleOpenMenu}
        btnRef={btnRef}
        openDrawer={openDrawer}
      />
      <GeneralAddMenu anchorEl={anchorEl} handleClose={handleCloseMenu} />
    </div>
  );
}

export { GeneralAddButton };
