import PropTypes from "prop-types";
import { Popover } from "@material-ui/core";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import CONSTANTS from "../../utils/constants";

function DatePickerPopover({
  anchorEl,
  closeMenu,
  selectedDate,
  handleDateChange,
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
          <DatePicker
            autoOk
            variant="static"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </MuiPickersUtilsProvider>
      </div>
    </Popover>
  );
}

DatePickerPopover.propTypes = {
  anchorEl: PropTypes.elementType.isRequired,
  closeMenu: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date),
  handleDateChange: PropTypes.func.isRequired,
};

DatePickerPopover.defaultProps = {
  anchorEl: null,
  closeMenu: () => {},
  selectedDate: moment(),
  handleDateChange: () => {},
};

export { DatePickerPopover };
