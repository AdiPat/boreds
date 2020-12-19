import PropTypes from "prop-types";
import { Popover } from "@material-ui/core";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { CONSTANTS } from "../../utils/constants";

function DatePickerPopover(props) {
  return (
    <Popover
      open={Boolean(props.anchorEl)}
      anchorEl={props.anchorEl}
      onClose={props.closeMenu}
      anchorOrigin={CONSTANTS.POPOVER.ALIGN_BOTTOM_CENTER.anchorOrigin}
      transformOrigin={CONSTANTS.POPOVER.ALIGN_BOTTOM_CENTER.transformOrigin}
    >
      <div>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker
            autoOk
            variant="static"
            value={props.selectedDate}
            onChange={props.handleDateChange}
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

export { DatePickerPopover };
