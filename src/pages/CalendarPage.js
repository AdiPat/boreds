import { useEffect, useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { CircularLoader } from "../components/CircularLoader";
import AppContext from "../providers/AppContext";
import { CalendarContainer } from "../calendar/CalendarContainer";
import { parseCalendarExtras } from "../utils/util";

function CalendarPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useContext(AppContext);
  const history = useHistory();
  const location = useLocation();
  const extras = parseCalendarExtras(location.pathname);

  if (extras.invalidDate) {
    history.push("/calendar");
  }

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);

  return isLoggedIn ? (
    <CalendarContainer user={user} extras={extras} />
  ) : (
    <CircularLoader color="secondary" />
  );
}

export { CalendarPage };
