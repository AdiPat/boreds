import { useContext } from "react";
import { Redirect } from "react-router-dom";
import AppContext from "../providers/AppContext";
import { Dashboard } from "../dashboard/Dashboard";

function DashPage() {
  const user = useContext(AppContext);

  return user ? <Dashboard user={user}></Dashboard> : <Redirect to="/login" />;
}

export { DashPage };
