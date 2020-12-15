import React from "react";
import CalendarContext from "./CalendarContext";
import moment from "moment";
import CONSTANTS from "../utils/constants";
import { getWeek, getNextFourDays } from "../services/calendar";
import {
  attachCalendarEventsListener,
  detachCalendarEventsListener,
} from "../services/calendar-api";

class CalendarProvider extends React.PureComponent {
  constructor(props) {
    const now = moment(new Date());
    super(props);
    this.state = {
      selectedDate: now,
      events: {},
      eventsObserver: null,
      duration: CONSTANTS.CALENDAR.DURATIONS.week,
    };

    this.setSelectedDate = this.setSelectedDate.bind(this);
    this.getCurrentWeek = this.getCurrentWeek.bind(this);
    this.getFourDays = this.getFourDays.bind(this);
    this.setCalendarDuration = this.setCalendarDuration.bind(this);
    this.selectDateNow = this.selectDateNow.bind(this);
    this.setYearEventsInState = this.setYearEventsInState.bind(this);
    this.updateYearEvents = this.updateYearEvents.bind(this);
  }

  setYearEventsInState(events, observer) {
    let calendarEvents = {};
    events.forEach((event) => {
      let updatedEvent = Object.assign({}, event);
      updatedEvent.date = moment(event.date);
      updatedEvent.startTime = moment(event.startTime);
      updatedEvent.endTime = moment(event.endTime);

      let dateKey = updatedEvent.date.format("DD-MM-YYYY");
      let timeKey = updatedEvent.startTime.format("HH");

      if (calendarEvents[dateKey] == undefined) {
        calendarEvents[dateKey] = {};
        calendarEvents[dateKey][timeKey] = [updatedEvent];
      } else if (calendarEvents[dateKey][timeKey] == undefined) {
        calendarEvents[dateKey][timeKey] = [updatedEvent];
      } else {
        calendarEvents[dateKey][timeKey].push(updatedEvent);
      }
    });
    this.setState({ eventsObserver: observer, events: calendarEvents });
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
    const updatedDate = moment(date);
    if (updatedDate.isValid()) {
      this.setState({ selectedDate: updatedDate });
    }
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

  async updateYearEvents() {
    attachCalendarEventsListener(
      this.state.selectedDate.year(),
      this.props.userId,
      this.setYearEventsInState
    );
  }

  componentDidMount() {
    this.updateYearEvents();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedDate.year() !== this.state.selectedDate.year()) {
      if (this.state.eventsObserver) {
        detachCalendarEventsListener(this.state.eventsObserver);
        this.updateYearEvents();
      }
    }
  }

  componentWillUnmount() {
    if (this.state.eventsObserver) {
      detachCalendarEventsListener(this.state.eventsObserver);
    }
  }

  render() {
    return (
      <CalendarContext.Provider
        value={{
          state: this.state,
          events: this.state.events,
          selectedDate: this.state.selectedDate,
          setSelectedDate: this.setSelectedDate,
          selectDateNow: this.selectDateNow,
          setCalendarDuration: this.setCalendarDuration,
          getCurrentWeek: this.getCurrentWeek,
          getFourDays: this.getFourDays,
        }}
      >
        {this.props.children}
      </CalendarContext.Provider>
    );
  }
}

export default CalendarProvider;
