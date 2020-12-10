import React from "react";
import CalendarContext from "./CalendarContext";
import moment from "moment";
import { isDateEqual } from "../utils/util";
import CONSTANTS from "../utils/constants";
import {
  getWeekCalendar,
  getWeek,
  getNextFourDays,
} from "../services/calendar";

class CalendarProvider extends React.PureComponent {
  constructor(props) {
    const now = moment(new Date());
    super(props);
    this.state = {
      selectedDate: now,
      remount: false,
      calendar: getWeekCalendar(now.month(), now.year()),
      duration: CONSTANTS.CALENDAR.DURATIONS.week,
    };

    this.forceUpdate = this.forceUpdate.bind(this);
    this.setSelectedDate = this.setSelectedDate.bind(this);
    this.updateCalendar = this.updateCalendar.bind(this);
    this.getCurrentWeek = this.getCurrentWeek.bind(this);
    this.getFourDays = this.getFourDays.bind(this);
    this.setCalendarDuration = this.setCalendarDuration.bind(this);
    this.selectDateNow = this.selectDateNow.bind(this);
  }

  forceProviderUpdate() {
    this.setState({ remount: !this.state.remount });
  }

  setCalendarDuration(duration) {
    const foundDuration = Object.values(CONSTANTS.CALENDAR.DURATIONS).find(
      (_duration) => _duration === duration
    );

    // set default
    if (!foundDuration) {
      this.setState({ duration: CONSTANTS.CALENDAR.DURATIONS.week });
    } else {
      this.setState({ duration: duration });
    }
  }

  setSelectedDate(date) {
    this.setState({ selectedDate: date });
  }

  selectDateNow() {
    const now = moment();
    this.setSelectedDate(now);
  }

  getCurrentWeek() {
    return getWeek(this.state.selectedDate);
  }

  getFourDays() {
    return getNextFourDays(this.state.selectedDate);
  }

  updateCalendar() {
    const weekCalendar = getWeekCalendar(
      this.state.selectedDate.month(),
      this.state.selectedDate.year()
    );
    this.setState({ calendar: weekCalendar });
  }

  componentDidMount() {
    this.updateCalendar();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isDateEqual(prevState.selectedDate, this.state.selectedDate)) {
      this.updateCalendar();
    }
  }

  render() {
    return (
      <CalendarContext.Provider
        value={{
          state: this.state,
          selectedDate: this.state.selectedDate,
          setSelectedDate: this.setSelectedDate,
          selectDateNow: this.selectDateNow,
          setCalendarDuration: this.setCalendarDuration,
          getCurrentWeek: this.getCurrentWeek,
          getFourDays: this.getFourDays,
          calendar: this.state.calendar,
        }}
      >
        {this.props.children}
      </CalendarContext.Provider>
    );
  }
}

export default CalendarProvider;
