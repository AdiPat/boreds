import React from "react";
import CalendarContext from "./CalendarContext";
import moment from "moment";
import { CONSTANTS } from "../utils/constants";
import {
  attachCalendarEventsListener,
  detachCalendarEventsListener,
} from "../services/calendar-api";

class CalendarProvider extends React.Component {
  constructor(props) {
    const extras = props.extras;
    const now = moment(new Date());
    super(props);
    this.state = {
      selectedDate:
        extras.invalidDate == undefined || extras.invalidDate
          ? now
          : extras.selectedDate,
      events: {},
      eventsCount: 0,
      eventsObserver: null,
      eventsLastUpdated: -1,
      duration: extras.duration
        ? extras.duration
        : CONSTANTS.CALENDAR.DURATIONS.week,
    };

    this.setSelectedDate = this.setSelectedDate.bind(this);
    this.setCalendarDuration = this.setCalendarDuration.bind(this);
    this.selectDateNow = this.selectDateNow.bind(this);
    this.setYearEventsInState = this.setYearEventsInState.bind(this);
    this.updateYearEvents = this.updateYearEvents.bind(this);
    // snackbar
    this.getCalendarEvents = this.getCalendarEvents.bind(this);
    this.getTimeDividedCalendarEvents = this.getTimeDividedCalendarEvents.bind(
      this
    );
  }

  setYearEventsInState(eventDocs, observer) {
    let calendarEvents = {};
    let numEvents = 0;
    eventDocs.forEach((eventDocSnapshot, i) => {
      const event = eventDocSnapshot.data();
      let updatedEvent = Object.assign({}, event);
      updatedEvent.id = eventDocSnapshot.id;
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
      numEvents += 1;
    });
    this.setState({
      eventsObserver: observer,
      events: calendarEvents,
      eventsCount: numEvents,
      eventsLastUpdated: moment().valueOf(),
    });
  }

  setCalendarDuration(duration) {
    const foundDuration = Object.values(CONSTANTS.CALENDAR.DURATIONS).find(
      (_duration) => _duration === duration
    );

    // set default
    if (foundDuration && duration !== this.state.duration) {
      this.setState({ duration: duration }, () => {
        this.props.history.push(
          `/calendar/${duration}/${this.state.selectedDate.format(
            "YYYY/MM/DD"
          )}`
        );
      });
    }
  }

  setSelectedDate(date) {
    const updatedDate = moment(date);
    if (updatedDate.isValid()) {
      this.setState({ selectedDate: updatedDate }, () => {
        this.props.history.push(
          `/calendar/${this.state.duration}/${updatedDate.format("YYYY/MM/DD")}`
        );
      });
    }
  }

  selectDateNow() {
    const now = moment();
    this.setSelectedDate(now);
  }

  async updateYearEvents() {
    attachCalendarEventsListener(
      this.state.selectedDate.year(),
      this.props.userId,
      this.setYearEventsInState
    );
  }

  getCalendarEvents(date, by = "time") {
    let slotEvents = [];
    let dayEvents = {};
    try {
      const dateKey = date.format("DD-MM-YYYY");
      const timeKey = date.format("HH");
      if (by === "time") {
        slotEvents = this.state.events[dateKey][timeKey];
      } else if (by === "day") {
        dayEvents = this.state.events[dateKey];
        if (dayEvents) {
          Object.keys(dayEvents).forEach((timeSlot) => {
            const slot = dayEvents[timeSlot];
            if (slot) {
              let curSlot = dayEvents[timeSlot];
              slotEvents.push(curSlot);
            }
          });
          slotEvents = slotEvents.flat();
        }
      }
    } catch (err) {
      slotEvents = [];
    } finally {
      if (!slotEvents) {
        slotEvents = [];
      }
    }
    return slotEvents;
  }

  getTimeDividedCalendarEvents(date) {
    const timeSlots = CONSTANTS.CALENDAR.DAY_TIME_SLOT;
    let slotEventList = this.getCalendarEvents(date);
    let timeDividedEvents = [[], [], []];

    slotEventList.forEach((slot) => {
      const startMinutes = slot.startTime.minutes();

      if (startMinutes < timeSlots.start.max) {
        timeDividedEvents[0].push(slot);
      } else if (
        startMinutes >= timeSlots.quarter.min &&
        startMinutes < timeSlots.quarter.max
      ) {
        timeDividedEvents[1].push(slot);
      } else if (startMinutes >= timeSlots.middle.min) {
        timeDividedEvents[2].push(slot);
      }
    });
    return timeDividedEvents;
  }

  shouldComponentUpdate(nextProps, nextState) {
    let shouldUpdate = false;
    if (
      nextState.selectedDate.format("DD-MM-YYYY") !==
      this.state.selectedDate.format("DD-MM-YYYY")
    ) {
      shouldUpdate = true;
    }

    if (nextState.duration !== this.state.duration) {
      shouldUpdate = true;
    }

    if (
      nextState.eventsCount !== this.state.eventsCount ||
      nextState.selectedDate.year() !== this.state.selectedDate.year()
    ) {
      shouldUpdate = true;
    }

    if (nextState.eventsLastUpdated > this.state.eventsLastUpdated) {
      shouldUpdate = true;
    }

    return shouldUpdate;
  }

  componentDidMount() {
    this.updateYearEvents();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedDate.year() !== this.state.selectedDate.year()) {
      if (this.state.eventsObserver) {
        detachCalendarEventsListener(this.state.eventsObserver);
      }
      if (prevState.eventsObserver) {
        detachCalendarEventsListener(prevState.eventsObserver);
      }
      this.updateYearEvents();
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
          eventsLastUpdated: this.state.eventsLastUpdated,
          selectedDate: this.state.selectedDate,
          duration: this.state.duration,
          setSelectedDate: this.setSelectedDate,
          selectDateNow: this.selectDateNow,
          setCalendarDuration: this.setCalendarDuration,
          getCalendarEvents: this.getCalendarEvents,
          getTimeDividedCalendarEvents: this.getTimeDividedCalendarEvents,
        }}
      >
        {this.props.children}
      </CalendarContext.Provider>
    );
  }
}

export default CalendarProvider;
