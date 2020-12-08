import moment from "moment";
import { validateMonth, validateYear, validateWeekday } from "../utils/util";
import CONSTANTS from "../utils/constants";

// gets no. of days in a month, uses 0 indexing
const getDaysInMonth = (month, year) => {
  validateMonth(month);
  validateYear(year);

  const _month = parseInt(month);
  const _year = parseInt(year);

  const lastDate = new Date(_year, _month, 0).getDate();
  return lastDate;
};

const getWeekDayName = (weekdayIdx) => {
  validateWeekday(weekdayIdx);
  const _weekday = parseInt(weekdayIdx);
  return CONSTANTS.CALENDAR.WEEKDAYS[_weekday];
};

const getMonthName = (monthIdx) => {
  validateMonth(monthIdx);
  const _month = parseInt(monthIdx);
  return CONSTANTS.CALENDAR.MONTHS[_month];
};

const getMonthCalendar = (month, year) => {
  validateMonth(month);
  validateYear(year);

  const _month = parseInt(month);
  const _year = parseInt(year);

  const daysCount = getDaysInMonth(_month, _year);
  const dates = [];

  for (let day = 1; day <= daysCount; day++) {
    const curDate = new Date(_year, _month, day);
    const curDay = moment(curDate);
    dates.push(curDay);
  }
  return dates;
};

const getWeekCalendar = (month, year) => {
  // checks
  validateMonth(month);
  validateYear(year);

  const _month = parseInt(month);
  const _year = parseInt(year);

  let weekCalendar = getMonthCalendar(_month, _year);

  // pad start of the month
  let firstDay = weekCalendar[0].clone();
  let weekStart = firstDay.clone().startOf("week");
  while (firstDay.day() != weekStart.day()) {
    const _dayBefore = firstDay.clone().subtract(1, "days");
    weekCalendar.unshift(_dayBefore);
    firstDay = _dayBefore;
  }

  // pad end of the month
  let lastDay = weekCalendar[weekCalendar.length - 1].clone();
  let weekEnd = lastDay.clone().endOf("week");
  while (lastDay.day() != weekEnd.day()) {
    const _nextDay = lastDay.clone().add(1, "days");
    weekCalendar.push(_nextDay);
    lastDay = _nextDay;
  }

  return weekCalendar;
};

const getDateButtonText = (date) => {
  const curDate = moment(date);
  const weekStartDate = moment(date).startOf("week");
  const weekEndDate = moment(date).endOf("week");
  let btnDisplay = curDate.format("MMMM YYYY");

  const startMonth = weekStartDate.month();
  const curMonth = curDate.month();
  const endMonth = weekEndDate.month();

  if (startMonth != curMonth) {
    if (weekStartDate.year() != curDate.year()) {
      btnDisplay =
        weekStartDate.format("MMM YYYY") + " - " + curDate.format("MMM YYYY");
    } else {
      btnDisplay =
        weekStartDate.format("MMM") + " - " + curDate.format("MMM YYYY");
    }
  }

  if (endMonth != curMonth) {
    if (weekEndDate.year() != curDate.year()) {
      btnDisplay =
        curDate.format("MMM YYYY") + " - " + weekEndDate.format("MMM YYYY");
    } else {
      btnDisplay =
        curDate.format("MMM") + " - " + weekEndDate.format("MMM YYYY");
    }
  }

  return btnDisplay;
};

const getWeek = (date) => {
  const curDate = moment(date);

  if (!curDate.isValid()) {
    throw new TypeError("getWeek(): Invalid date supplied.");
  }

  const weekStart = curDate.clone().startOf("week");
  const weekEnd = curDate.clone().endOf("week");
  const week = [];
  let _day = weekStart.clone();
  while (_day.day() != weekEnd.day()) {
    week.push(_day);
    _day = _day.clone().add(1, "days");
  }
  week.push(weekEnd);
  return week;
};

const getTimeSlots = () => {
  const times = [];
  for (let i = 0; i < CONSTANTS.CALENDAR.HOURS_IN_DAY; i++) {
    const hourObj = moment().hour(i);
    const slot = {
      start: hourObj.format("hh A"),
      end: hourObj.clone().add(1, "hour").format("hh A"),
    };
    slot.start = slot.start[0] === "0" ? slot.start.substring(1) : slot.start;
    slot.end = slot.end[0] === "0" ? slot.end.substring(1) : slot.end;
    times.push(slot);
  }
  return times;
};

export {
  getDaysInMonth,
  getMonthName,
  getMonthCalendar,
  getWeekDayName,
  getWeekCalendar,
  getDateButtonText,
  getWeek,
  getTimeSlots,
};
