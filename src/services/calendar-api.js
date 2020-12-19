import firebase from "firebase/app";
import moment from "moment";
import { getUTCString } from "../utils/calendar-utils";

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

const updateCalendarEvent = async (eventId, updatedEvent) => {
  let _updatedEvent = Object.assign({}, updatedEvent);
  _updatedEvent.eventDate = getUTCString(_updatedEvent.eventDate);
  _updatedEvent.eventStartTime = getUTCString(_updatedEvent.eventStartTime);
  _updatedEvent.eventEndTime = getUTCString(_updatedEvent.eventEndTime);

  const _updateCalendarEvent = firebase
    .functions()
    .httpsCallable("updateCalendarEvent");

  return _updateCalendarEvent({ eventId: eventId, event: _updatedEvent })
    .then((res) => res.data)
    .catch((err) => ({
      status: false,
      ...err,
    }));
};

const deleteCalendarEvent = async (eventId) => {
  let _deleteCalendarEvent = firebase
    .functions()
    .httpsCallable("deleteCalendarEvent");

  return _deleteCalendarEvent({ eventId })
    .then((res) => res.data)
    .catch((err) => ({
      status: false,
      ...err,
    }));
};

const attachCalendarEventsListener = async (year, userId, setEventsInState) => {
  const momentDate = moment().year(year);
  const startDate = momentDate.clone().startOf("year");
  const endDate = momentDate.clone().endOf("year");
  const query = firebase
    .firestore()
    .collection("calendarEvents")
    .doc(userId)
    .collection("events")
    .where("date", ">=", getUTCString(startDate))
    .where("date", "<=", getUTCString(endDate));

  const observer = query.onSnapshot(
    (querySnapshot) => {
      const docs = querySnapshot.docs;
      setEventsInState(docs, observer);
    },
    (err) => {
      console.error(
        "attachCalendarEventsListener: Failed at attach listener. ",
        err
      );
    }
  );
  return observer;
};

const detachCalendarEventsListener = (observer) => {
  observer();
};

export {
  addCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
  attachCalendarEventsListener,
  detachCalendarEventsListener,
};
