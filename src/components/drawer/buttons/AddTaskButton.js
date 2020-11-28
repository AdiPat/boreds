import { useState } from "react";
import { SideMenuButton } from "./SideMenuButton";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import { CreateTaskModal } from "../../modals/CreateTaskModal";

function AddTaskButton() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <SideMenuButton
        btnKey="CreateTask"
        text="Create Task"
        icon={<PlaylistAddIcon />}
        clickHandler={handleOpenModal}
      />
      <CreateTaskModal
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        openModal={openModal}
      ></CreateTaskModal>
    </div>
  );
}

export { AddTaskButton };
