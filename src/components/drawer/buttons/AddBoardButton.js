import { useState } from "react";
import { SideMenuButton } from "./SideMenuButton";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
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
        icon={<AddCircleRoundedIcon />}
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
