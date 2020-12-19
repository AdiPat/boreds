import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import CalendarContext from "../../providers/CalendarContext";
import { CalendarUIContext } from "../CalendarUIContext";
import { areDatesEqual } from "../../utils/calendar-utils";

function YearMonth({ month }) {
  const { selectedDate, setSelectedDate } = useContext(CalendarContext);
  const [state, setState] = useState({ date: selectedDate, clickCount: 0 });
  const { eventListPopover } = useContext(CalendarUIContext);

  const handleClick = (e, date) => {
    if (
      (state.clickCount == 0 && !areDatesEqual(date, selectedDate)) ||
      !areDatesEqual(state.date, date)
    ) {
      eventListPopover.show(e, date);
      setState({ date: date, clickCount: 1 });
    } else if (state.clickCount === 1 && areDatesEqual(state.date, date)) {
      setSelectedDate(date);
      setState({ date: date, clickCount: 0 });
    }
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
    newProps.current = areDatesEqual(state.date, day);
    newProps.selected = areDatesEqual(selectedDate, day);
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
          onChange={(d) => {}}
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
