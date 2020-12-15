function _inRange(val, start, end) {
  return val >= start && val < end;
}

let _constants = {
  SNACKBAR: {
    defaultDuration: 3000, //ms
  },
  POPOVER: {
    ALIGN_BOTTOM_CENTER: {
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
      transformOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    },
  },

  CALENDAR: {
    DAY_SLOT_HEIGHT: (theme) => theme.spacing(8),
    DAY_TIME_SLOT_FLAGS: {
      start: false,
      quarter: false,
      middle: false,
      threeQuarter: false,
      full: false,
    },
    DAY_TIME_SLOT_FLAGS_CHECK: {
      start: (mins) => _inRange(mins, 0, 15),
      quarter: (mins) => _inRange(mins, 15, 30),
      middle: (mins) => _inRange(mins, 30, 40),
      threeQuarter: (mins) => _inRange(mins, 40, 50),
      full: (mins) => _inRange(mins, 50, 60),
    },
    HOURS_IN_DAY: 24,
    DAYS_IN_WEEK: 7,
    DAYS_IN_FOUR_DAYS: 4,
    MONTHS_IN_YEAR: 12,
    NUM_DAYS: {
      day: 1,
      week: 7,
      fourdays: 4,
    },
    IDS: {
      calendarHeader: "calendarHeader",
    },
    DURATIONS: {
      day: "day",
      week: "week",
      month: "month",
      year: "year",
      fourdays: "fourdays",
    },
    DURATIONS_TEXT: {
      day: "Day",
      week: "Week",
      month: "Month",
      year: "Year",
      fourdays: "4 Days",
    },
    WEEKDAYS: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    WEEKDAYS_INDEX: {
      MONDAY: 1,
      TUESDAY: 2,
      WEDNESDAY: 3,
      THURSDAY: 4,
      FRIDAY: 5,
      SATURDAY: 6,
      SUNDAY: 7,
    },
    MONTHS: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    MONTHS_INDEX: {
      JANUARY: 0,
      FEBRURARY: 1,
      MARCH: 2,
      APRIL: 3,
      MAY: 4,
      JUNE: 5,
      JULY: 6,
      AUGUST: 7,
      SEPTEMBER: 8,
      OCTOBER: 9,
      NOVEMBER: 10,
      DECEMBER: 11,
    },
  },
};

export default _constants;
