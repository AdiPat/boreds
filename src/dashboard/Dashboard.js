import { DashDrawer } from "../components/DashDrawer";
import { DashContent } from "./DashContent";

function Dashboard(props) {
  return (
    <div>
      <DashDrawer dashTitle="Dashboard"></DashDrawer>
      <DashContent user={props.user}></DashContent>
    </div>
  );
}

export { Dashboard };
