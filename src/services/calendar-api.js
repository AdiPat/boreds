import firebase from "firebase/app";
import moment from "moment";

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
  _updatedEvent.eventDate = _updatedEvent.eventDate.utc().format();
  _updatedEvent.eventStartTime = _updatedEvent.eventStartTime.utc().format();
  _updatedEvent.eventEndTime = _updatedEvent.eventEndTime.utc().format();

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

const attachCalendarEventsListener = async (year, userId, setEventsInState) => {
  const momentDate = moment().year(year);
  const startDate = momentDate.clone().startOf("year");
  const endDate = momentDate.clone().endOf("year");
  const query = firebase
    .firestore()
    .collection("calendarEvents")
    .doc(userId)
    .collection("events")
    .where("date", ">=", startDate.utc().format())
    .where("date", "<=", endDate.utc().format());

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
  attachCalendarEventsListener,
  detachCalendarEventsListener,
};
