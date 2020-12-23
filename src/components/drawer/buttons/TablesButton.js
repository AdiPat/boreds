import { useHistory } from "react-router-dom";
import TableChartIcon from "@material-ui/icons/TableChart";
import { SideMenuButton } from "./SideMenuButton";

function TablesButton({ openDrawer }) {
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
      openDrawer={openDrawer}
    />
  );
}

export { TablesButton };
