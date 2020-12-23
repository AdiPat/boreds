import { useState } from "react";
import PropTypes from "prop-types";
import { SideMenuButton } from "./SideMenuButton";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import { CreateTaskModal } from "../../modals/CreateTaskModal";

function AddTaskButton(props) {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClick = () => {
    handleOpenModal();
    if (props.handleCloseMenu) {
      props.handleCloseMenu();
    }
  };

  return (
    <div>
      <SideMenuButton
        btnKey="CreateTask"
        text="Create Task"
        icon={<PlaylistAddIcon />}
        clickHandler={handleClick}
        openDrawer
      />
      <CreateTaskModal
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        openModal={openModal}
      ></CreateTaskModal>
    </div>
  );
}

AddTaskButton.propTypes = {
  handleCloseMenu: PropTypes.func,
};

AddTaskButton.defaultProps = {
  handleCloseMenu: null,
};

export { AddTaskButton };
