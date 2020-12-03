import { useState } from "react";
import { SideMenuButton } from "./SideMenuButton";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import { CreateBoardModal } from "../../modals/CreateBoardModal";

function AddBoardButton() {
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
        btnKey="CreateBoard"
        text="Create Board"
        icon={<NoteAddIcon />}
        clickHandler={handleOpenModal}
      />
      <CreateBoardModal
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        openModal={openModal}
      ></CreateBoardModal>
    </div>
  );
}

export { AddBoardButton };
