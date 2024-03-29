import { useState, useRef, useContext } from "react";
import { Button } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useTheme } from "@material-ui/core/styles";
import { DatePickerPopover } from "../menus/DatePickerPopover";
import CalendarContext from "../../providers/CalendarContext";
import { getDateButtonText } from "../../services/calendar";

function DateButton() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const btnRef = useRef(null);
  const { setSelectedDate, selectedDate } = useContext(CalendarContext);

  // formatted btn display
  const btnText = getDateButtonText(selectedDate);

  const openMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div style={{ marginLeft: theme.spacing(2) }}>
      <Button
        style={{
          marginLeft: "auto",
          color: "black",
          backgroundColor: "white",
        }}
        size="large"
        onClick={openMenu}
        ref={btnRef}
      >
        <span>{btnText}</span>
        <ArrowDropDownIcon />
      </Button>
      <DatePickerPopover
        handleDateChange={handleDateChange}
        selectedDate={selectedDate}
        anchorEl={anchorEl}
        closeMenu={closeMenu}
      />
    </div>
  );
}

export { DateButton };
