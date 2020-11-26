import PropTypes from "prop-types";
import { useState } from "react";
import { Tooltip, IconButton } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { DeleteBoardModal } from "../../components/modals/DeleteBoardModal";

function DeleteBoardButton(props) {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const loadDeleteModal = (boardId) => {
    console.log("Deleting board: ", boardId);
    setOpenModal(true);
  };

  return (
    <div>
      <Tooltip title="Delete Board" placement="top">
        <IconButton onClick={() => loadDeleteModal(props.boardId)}>
          <DeleteOutlineIcon color="primary" />
        </IconButton>
      </Tooltip>
      <DeleteBoardModal
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        openModal={openModal}
        boardTitle={props.boardTitle}
        userId={props.userId}
        boardId={props.boardId}
        showNoBoards={true}
      />
    </div>
  );
}

DeleteBoardButton.propTypes = {
  userId: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
};

export { DeleteBoardButton };
