import PropTypes from "prop-types";
import { Popover } from "@material-ui/core";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import CONSTANTS from "../../utils/constants";

function TimePickerPopover({
  anchorEl,
  closeMenu,
  selectedTime,
  handleTimeChange,
  disableToolbar,
}) {
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={closeMenu}
      anchorOrigin={CONSTANTS.POPOVER.ALIGN_BOTTOM_CENTER.anchorOrigin}
      transformOrigin={CONSTANTS.POPOVER.ALIGN_BOTTOM_CENTER.transformOrigin}
    >
      <div>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <TimePicker
            autoOk
            variant="static"
            value={selectedTime}
            onChange={handleTimeChange}
            disableToolbar={disableToolbar}
          />
        </MuiPickersUtilsProvider>
      </div>
    </Popover>
  );
}

TimePickerPopover.propTypes = {
  anchorEl: PropTypes.elementType.isRequired,
  closeMenu: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date),
  handleDateChange: PropTypes.func.isRequired,
  disableToolbar: PropTypes.bool,
};

TimePickerPopover.defaultProps = {
  anchorEl: null,
  closeMenu: () => {},
  selectedDate: moment(),
  handleDateChange: () => {},
  disableToolbar: false,
};

export { TimePickerPopover };
