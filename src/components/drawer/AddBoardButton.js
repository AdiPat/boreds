import PropTypes from "prop-types";
import { SideMenuButton } from "./SideMenuButton";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";

function AddBoardButton(props) {
  return (
    <SideMenuButton
      key="CreateBoard"
      text="Create Board"
      icon={<AddCircleRoundedIcon />}
      clickHandler={props.openModal}
    />
  );
}

AddBoardButton.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export { AddBoardButton };
