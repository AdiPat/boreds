import { useTheme } from "@material-ui/core/styles";
import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Typography, useMediaQuery } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";

function TasksDeleteButton(props) {
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
      {/* TODO: Add delete task modal*/}
    </div>
  );
}

TasksDeleteButton.propTypes = {
  userId: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
  taskTitle: PropTypes.string.isRequired,
};

export { TasksDeleteButton };
