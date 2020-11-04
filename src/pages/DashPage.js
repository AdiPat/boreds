import { useContext, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import UserContext from "../providers/UserContext";
import { Dashboard } from "../dashboard/Dashboard";

function DashPage() {
  const user = useContext(UserContext);
  const history = useHistory();

  return user ? <Dashboard user={user}></Dashboard> : <Redirect to="/login" />;
}

export { DashPage };
