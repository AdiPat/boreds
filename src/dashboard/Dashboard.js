import { DashDrawer } from "../components/DashDrawer";
import { DashContent } from "./DashContent";

function Dashboard(props) {
  const userId = props.user ? props.user.uid : null;
  return (
    <div>
      <DashDrawer dashTitle="Dashboard" userId={userId}></DashDrawer>
      <DashContent user={props.user}></DashContent>
    </div>
  );
}

export { Dashboard };
