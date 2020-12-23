import { useState, useEffect, useContext } from "react";
import { CircularLoader } from "../components/CircularLoader";
import AppContext from "../providers/AppContext";
import { TablesContainer } from "../tables/TablesContainer";

function TablesPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useContext(AppContext);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);

  return isLoggedIn ? (
    <TablesContainer user={user} />
  ) : (
    <CircularLoader color="secondary" />
  );
}

export { TablesPage };
