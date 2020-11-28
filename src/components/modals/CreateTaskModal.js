import { React, useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import { Grid, TextField, Button, Snackbar } from "@material-ui/core";
import { SimpleModal } from "./SimpleModal";

function CreateTaskModal(props) {
  const theme = useTheme();
  const [newTaskName, setNewTaskName] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleTitleChange = (e) => {
    setNewTaskName(e.target.value);
  };

  const resetParams = (snackbarMsg) => {
    setSnackbarMessage(snackbarMsg);
    setOpenSnackbar(true);
    setNewTaskName("");
    props.handleCloseModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // createTask()
    resetParams(
      `TODO: Connect createTask() to backend to create task ${newTaskName}. `
    );
  };

  return (
    <div>
      <SimpleModal
        openModal={props.openModal}
        handleCloseModal={props.handleCloseModal}
      >
        <form onSubmit={handleSubmit}>
          <Grid container direction="column" justify="center">
            <Grid item xs={12}>
              <TextField
                label="Add task title"
                variant="outlined"
                value={newTaskName}
                onChange={handleTitleChange}
              />
            </Grid>
            <Grid item xs={12} style={{ marginTop: theme.spacing(1) }}>
              <Button type="submit" variant="contained" color="primary">
                Create Task
              </Button>
            </Grid>
          </Grid>
        </form>
      </SimpleModal>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openSnackbar}
        onClose={(event, reason) => {
          setOpenSnackbar(false);
        }}
        autoHideDuration={3000}
        message={snackbarMessage}
      />
    </div>
  );
}

CreateTaskModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
};

CreateTaskModal.defaultProps = {
  openModal: false,
};

export { CreateTaskModal };
