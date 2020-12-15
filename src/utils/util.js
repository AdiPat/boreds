import moment, { duration } from "moment";
import CONSTANTS from "./constants";

const validateMonth = (month) => {
  const _month = parseInt(month);

  if (Number.isNaN(_month)) {
    throw new TypeError("[month] should be an integer.");
  }

  if (
    _month < CONSTANTS.CALENDAR.MONTHS_INDEX.JANUARY ||
    _month > CONSTANTS.CALENDAR.MONTHS_INDEX.DECEMBER
  ) {
    throw new RangeError("[month] must be in range [0,11] included.");
  }
};

const validateYear = (year) => {
  const _year = parseInt(year);

  if (Number.isNaN(_year)) {
    throw new TypeError("[year] should be an integer.");
  }

  if (_year < 0) {
    throw new RangeError("[year] cannot be negative.");
  }
};

const validateWeekday = (weekday) => {
  const weekdayIdx = parseInt(weekday);

  if (Number.isNaN(weekdayIdx)) {
    throw new TypeError("[weekday] should be an integer.");
  }

  if (
    weekdayIdx < CONSTANTS.CALENDAR.WEEKDAYS_INDEX.MONDAY ||
    weekdayIdx > CONSTANTS.CALENDAR.WEEKDAYS_INDEX.SUNDAY
  ) {
    throw new RangeError("[weekday] should be in [1,7] inclusive. ");
  }
};

const isDateEqual = (d1, d2) => {
  return d1.format("DD MM YYYY") === d2.format("DD MM YYYY");
};

const splitMonthToWeeks = (calendar) => {
  let res = calendar;
  const daysInWeek = CONSTANTS.CALENDAR.NUM_DAYS.week;
  try {
    res = [];
    let start = 0;
    let end = start + daysInWeek;
    while (end <= calendar.length) {
      const curWeek = calendar.slice(start, end);
      res.push(curWeek);
      start = end;
      end = start + daysInWeek;
    }
  } catch (err) {
    console.error("splitMonthIntoWeeks(): Failed to split calendar. ", err);
  }
  return res;
};

const getDurationFlags = (duration) => {
  const flags = {};
  Object.keys(CONSTANTS.CALENDAR.DURATIONS).forEach(
    (key) => (flags[key] = duration === key)
  );
  return flags;
};

export {
  validateMonth,
  validateYear,
  validateWeekday,
  isDateEqual,
  splitMonthToWeeks,
  getDurationFlags,
};
