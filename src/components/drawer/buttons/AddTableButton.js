import PropTypes from "prop-types";
import { SideMenuButton } from "./SideMenuButton";
import TableChartIcon from "@material-ui/icons/TableChart";

function AddTableButton(props) {
  const handleClick = () => {
    if (props.handleCloseMenu) {
      props.handleCloseMenu();
    }
  };

  return (
    <div>
      <SideMenuButton
        btnKey="CreateTable"
        text="Create Table"
        icon={<TableChartIcon />}
        clickHandler={handleClick}
        openDrawer
      />
    </div>
  );
}

AddTableButton.propTypes = {
  handleCloseMenu: PropTypes.func,
};

AddTableButton.defaultProps = {
  handleCloseMenu: null,
};

export { AddTableButton };
