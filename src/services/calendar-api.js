import firebase from "firebase/app";

const addCalendarEvent = async (calendarEvent) => {
  const _addCalendarEvent = firebase
    .functions()
    .httpsCallable("addCalendarEvent");

  // return _addCalendarEvent(calendarEvent);

  return _addCalendarEvent(calendarEvent)
    .then((res) => res.data)
    .catch((err) => ({
      status: false,
      ...err,
    }));
};

export { addCalendarEvent };
