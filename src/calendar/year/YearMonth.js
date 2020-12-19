import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import CalendarContext from "../../providers/CalendarContext";
import { CalendarUIContext } from "../CalendarUIContext";

function YearMonth({ month }) {
  const { selectedDate, setSelectedDate } = useContext(CalendarContext);
  const { eventListPopover } = useContext(CalendarUIContext);

  const handleClick = (e, date) => {
    eventListPopover.show(e, date);
    setSelectedDate(date);
  };

  const _renderDayInPicker = (
    selectedDate,
    day,
    calSelectedDate,
    dayInCurrentMonth,
    dayComponent
  ) => {
    let newProps = Object.assign({}, dayComponent.props);
    newProps.hidden = false;
    newProps.current = false;
    newProps.selected =
      selectedDate.format("DD-MM-YYYY") === day.format("DD-MM-YYYY");
    newProps.onClick = (e) => handleClick(e, day);
    const _dayComponent = React.cloneElement(dayComponent, newProps);
    return _dayComponent;
  };

  const renderDayInPicker = (
    day,
    calSelectedDate,
    dayInCurrentMonth,
    dayComponent
  ) => {
    return _renderDayInPicker(
      selectedDate,
      day,
      calSelectedDate,
      dayInCurrentMonth,
      dayComponent
    );
  };

  return (
    <Grid item md={4} lg={3}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker
          variant="static"
          value={month.start.clone()}
          renderDay={renderDayInPicker}
          disableToolbar
          leftArrowIcon={null}
          rightArrowIcon={null}
        />
      </MuiPickersUtilsProvider>
    </Grid>
  );
}

YearMonth.propTypes = {
  month: PropTypes.array.isRequired,
};

export { YearMonth };
