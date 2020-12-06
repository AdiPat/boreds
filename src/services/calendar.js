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
  const curMonth = getMonthName(_month);
  for (let day = 1; day <= daysCount; day++) {
    const curDate = new Date(_year, _month, day);
    const curDay = {
      day: getWeekDayName(curDate.getDay()),
      month: curMonth,
      dateObj: curDate,
    };
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

  let firstDay = weekCalendar[0].dateObj.getDay();
  let lastDay = weekCalendar[weekCalendar.length - 1].dateObj.getDay();
  let prevMonth = null;
  let nextMonth = null;

  if (month == CONSTANTS.CALENDAR.MONTHS_INDEX.JANUARY) {
    prevMonth = getMonthCalendar(11, _year - 1);
  } else {
    prevMonth = getMonthCalendar(_month - 1, _year);
  }

  if (month == CONSTANTS.CALENDAR.MONTHS_INDEX.DECEMBER) {
    nextMonth = getMonthCalendar(0, _year + 1);
  } else {
    nextMonth = getMonthCalendar(_month + 1, _year);
  }

  // pad first week
  if (firstDay != CONSTANTS.CALENDAR.WEEKDAYS_INDEX.MONDAY) {
    let i = 0;
    while (firstDay > CONSTANTS.CALENDAR.WEEKDAYS_INDEX.MONDAY) {
      const prevDay = prevMonth[prevMonth.length - 1 - i];
      weekCalendar.unshift(prevDay);
      i++;
      firstDay--;
    }
  }

  // pad last week
  if (lastDay != CONSTANTS.CALENDAR.WEEKDAYS_INDEX.SUNDAY) {
    let i = 0;
    while (lastDay < CONSTANTS.CALENDAR.WEEKDAYS_INDEX.SUNDAY) {
      const nextDay = nextMonth[i];
      weekCalendar.push(nextDay);
      i++;
      lastDay++;
    }
  }

  return weekCalendar;
};

export {
  getDaysInMonth,
  getMonthName,
  getMonthCalendar,
  getWeekDayName,
  getWeekCalendar,
};
