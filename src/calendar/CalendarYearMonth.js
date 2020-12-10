import React, { useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Grid } from "@material-ui/core";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import CalendarContext from "../providers/CalendarContext";

function CalendarYearMonth({ month }) {
  const { selectedDate, setSelectedDate } = useContext(CalendarContext);

  const handleDateChange = (date) => {
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
      dayInCurrentMonth &&
      selectedDate.format("DD-MM-YYYY") === day.format("DD-MM-YYYY");
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
    <Grid item xs={4} md={3}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker
          variant="static"
          value={month.start.clone()}
          renderDay={renderDayInPicker}
          disableToolbar
          onChange={handleDateChange}
          leftArrowIcon={null}
          rightArrowIcon={null}
        />
      </MuiPickersUtilsProvider>
    </Grid>
  );
}

CalendarYearMonth.propTypes = {
  month: PropTypes.array.isRequired,
};

export { CalendarYearMonth };
