import { teal, amber, pink, blue, grey } from "@material-ui/core/colors";

function _inRange(val, start, end) {
  return val >= start && val < end;
}

function _getAnchor(
  anchorOriginVertical,
  anchorOriginHorizontal,
  transformOriginVertical,
  transformOriginHorizontal
) {
  // top, bottom, left, right, center
  return {
    anchorOrigin: {
      vertical: anchorOriginVertical,
      horizontal: anchorOriginHorizontal,
    },
    transformOrigin: {
      vertical: transformOriginVertical,
      horizontal: transformOriginHorizontal,
    },
  };
}

let _constants = {
  SNACKBAR: {
    defaultDuration: 3000, //ms
  },
  POPOVER: {
    ALIGN_BOTTOM_CENTER: _getAnchor("bottom", "center", "top", "center"),
    ALIGN_CENTER_RIGHT: _getAnchor("center", "right", "center", "left"),
    ALIGN_TOP_CENTER: _getAnchor("top", "center", "bottom", "center"),
    ALIGN_CENTER_LEFT: _getAnchor("center", "left", "center", "right"),
  },

  CALENDAR: {
    DAY_SLOT_HEIGHT: (theme) => theme.spacing(15),
    DAY_TIME_SLOT_FLAGS: {
      start: false,
      quarter: false,
      middle: false,
      threeQuarter: false,
      full: false,
    },
    DAY_TIME_SLOT: {
      start: { min: 0, max: 15 },
      quarter: { min: 15, max: 30 },
      middle: { min: 30, max: 40 },
      threeQuarter: { min: 40, max: 50 },
      full: { min: 50, max: 60 },
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

    EVENT: {
      colors: {
        teal: {
          backgroundColor: teal["A700"],
          fontColor: "white",
          hover: teal["A400"],
        },
        blue: { backgroundColor: blue[500], fontColor: "white" },
        amber: { backgroundColor: amber[500], fontColor: "white" },
        pink: { backgroundColor: pink[500], fontColor: "white" },
      },
    },
  },
};

export default _constants;
