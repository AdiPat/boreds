import { useHistory } from "react-router-dom";
import TableChartIcon from "@material-ui/icons/TableChart";
import { SideMenuButton } from "./SideMenuButton";

function TablesButton() {
  const history = useHistory();

  const tablesRedirect = () => {
    history.push("/tables");
  };

  return (
    <SideMenuButton
      btnKey="Tables"
      text="Tables"
      icon={<TableChartIcon />}
      clickHandler={tablesRedirect}
    />
  );
}

export { TablesButton };
