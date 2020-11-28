import { useState, useRef } from "react";
import { SideMenuButton } from "./SideMenuButton";
import { GeneralAddMenu } from "../../menus/GeneralAddMenu";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";

function GeneralAddButton() {
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
      />
      <GeneralAddMenu anchorEl={anchorEl} handleClose={handleCloseMenu} />
    </div>
  );
}

export { GeneralAddButton };
