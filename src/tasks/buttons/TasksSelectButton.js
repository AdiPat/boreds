import { useState, useRef } from "react";
import { useTheme } from "@material-ui/core/styles";
import { Button, Typography, useMediaQuery } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { SelectTaskMenu } from "../menus/SelectTaskMenu";

function TasksSelectButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const btnRef = useRef(null);
  const theme = useTheme();
  const mediaQueryBelowXs = useMediaQuery(theme.breakpoints.down("xs"));

  const handleOpenMenu = (e) => {
    setAnchorEl(btnRef.current);
  };

  const handleCloseMenu = (e) => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="outlined"
        style={{
          marginRight: theme.spacing(2),
        }}
        onClick={handleOpenMenu}
        ref={btnRef}
      >
        <ArrowDropDownIcon style={{ marginRight: theme.spacing(1) }} />
        {!mediaQueryBelowXs ? (
          <Typography variant="body1">Tasks</Typography>
        ) : null}
      </Button>
      <SelectTaskMenu handleClose={handleCloseMenu} anchorEl={anchorEl} />
    </div>
  );
}

export { TasksSelectButton };
