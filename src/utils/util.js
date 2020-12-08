import moment from "moment";
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
  return moment(d1).isSame(moment(d2));
};

export { validateMonth, validateYear, validateWeekday, isDateEqual };
