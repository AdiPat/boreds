import { useEffect, useContext, useState } from "react";
import { CircularLoader } from "../components/CircularLoader";
import AppContext from "../providers/AppContext";
import { CalendarContainer } from "../calendar/CalendarContainer";

function CalendarPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useContext(AppContext);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);

  return isLoggedIn ? (
    <CalendarContainer user={user} />
  ) : (
    <CircularLoader color="secondary" />
  );
}

export { CalendarPage };
