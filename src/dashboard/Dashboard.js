import PropTypes from "prop-types";
import { AppDrawer } from "../components/drawer/AppDrawer";
import { DashContent } from "./DashContent";

function Dashboard(props) {
  const userId = props.user ? props.user.uid : null;
  return (
    <div>
      <AppDrawer dashTitle="Dashboard" userId={userId}></AppDrawer>
      <DashContent userId={props.userId}></DashContent>
    </div>
  );
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
};

export { Dashboard };
