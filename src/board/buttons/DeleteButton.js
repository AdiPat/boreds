import { useTheme } from "@material-ui/core/styles";
import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Typography, useMediaQuery } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";
import { DeleteBoardModal } from "../../components/modals/DeleteBoardModal";

function DeleteButton(props) {
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();
  const mediaQueryBelowXs = useMediaQuery(theme.breakpoints.down("xs"));

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        style={{
          marginRight: theme.spacing(2),
          color: red[600],
          borderColor: red[600],
        }}
        onClick={handleOpenModal}
      >
        <DeleteIcon style={{ marginRight: theme.spacing(1) }} />
        {!mediaQueryBelowXs ? (
          <Typography variant="body1">Delete</Typography>
        ) : null}
      </Button>

      <DeleteBoardModal
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        openModal={openModal}
        boardTitle={props.boardTitle}
        userId={props.userId}
        boardId={props.boardId}
        redirectUrl="/dashboard"
      />
    </div>
  );
}

DeleteButton.propTypes = {
  userId: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
  boardTitle: PropTypes.string.isRequired,
};

export { DeleteButton };
