import { AppDrawer } from "../components/drawer/AppDrawer";
import { DashContent } from "./DashContent";

function Dashboard(props) {
  const userId = props.user ? props.user.uid : null;
  return (
    <div>
      <AppDrawer dashTitle="Dashboard" userId={userId}></AppDrawer>
      <DashContent user={props.user}></DashContent>
    </div>
  );
}

export { Dashboard };
