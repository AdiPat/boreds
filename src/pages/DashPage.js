import { useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../providers/UserContext";
import { Dashboard } from "../dashboard/Dashboard";

function DashPage() {
  const user = useContext(UserContext);

  return user ? <Dashboard user={user}></Dashboard> : <Redirect to="/login" />;
}

export { DashPage };
