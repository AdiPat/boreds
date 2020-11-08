import { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import AppContext from "../providers/AppContext";
import { Dashboard } from "../dashboard/Dashboard";
import { CircularLoader } from "../components/CircularLoader";

function DashPage() {
  const { user } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  });

  return isLoading ? (
    <CircularLoader color="secondary" />
  ) : user ? (
    <Dashboard user={user}></Dashboard>
  ) : (
    <Redirect to="/login" />
  );
}

export { DashPage };
