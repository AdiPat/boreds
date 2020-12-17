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

const editCalendarEvent = async (updatedEvent) => {
  return {
    status: true,
  };
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
  editCalendarEvent,
  attachCalendarEventsListener,
  detachCalendarEventsListener,
};
