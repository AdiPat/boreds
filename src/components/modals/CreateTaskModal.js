import { React, useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Snackbar,
  Divider,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { SimpleModal } from "./SimpleModal";
import { addTask } from "../../services/tasks";

function CreateTaskModal(props) {
  const theme = useTheme();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleTitleChange = (e) => {
    setNewTaskTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setNewTaskDescription(e.target.value);
  };

  const resetParams = (snackbarMsg) => {
    setSnackbarMessage(snackbarMsg);
    setOpenSnackbar(true);
    setNewTaskTitle("");
    setNewTaskDescription("");
    setErrorMessage("");
    props.handleCloseModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit()");
    addTask(newTaskTitle, newTaskDescription).then((response) => {
      const status = response.status;
      if (!status) {
        setErrorMessage(response.msg);
      } else {
        resetParams(response.msg);
      }
    });
  };

  return (
    <div>
      <SimpleModal
        openModal={props.openModal}
        handleCloseModal={props.handleCloseModal}
      >
        <Typography
          variant="h5"
          align="center"
          style={{ marginBottom: theme.spacing(2) }}
        >
          Create new Task
        </Typography>
        <Divider />
        <Grid container>
          <Grid item xs={12}>
            <Typography
              variant="body1"
              style={{
                textTransform: "uppercase",
                marginTop: theme.spacing(2),
              }}
            >
              Title
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ padding: theme.spacing(0, 2, 2, 0) }}>
            <TextField
              label="Add task title"
              variant="outlined"
              value={newTaskTitle}
              onChange={handleTitleChange}
              style={{ width: "100%", marginTop: theme.spacing(1) }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body1"
              style={{
                textTransform: "uppercase",
              }}
            >
              Description
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ padding: theme.spacing(0, 2, 2, 0) }}>
            <TextField
              label="Add task description"
              variant="outlined"
              value={newTaskDescription}
              onChange={handleDescriptionChange}
              style={{ width: "100%", marginTop: theme.spacing(1) }}
            />
          </Grid>
          {errorMessage.length ? (
            <Grid
              item
              xs={12}
              style={{
                width: "100%",
                margin: theme.spacing(1, 0),
              }}
            >
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
          ) : null}
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: theme.spacing(1),
            }}
          >
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Create Task
            </Button>
          </Grid>
        </Grid>
      </SimpleModal>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openSnackbar}
        onClose={(event, reason) => {
          setTimeout(() => setOpenSnackbar(false), 5000);
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
  handleCloseMenu: PropTypes.func.isRequired,
};

CreateTaskModal.defaultProps = {
  openModal: false,
};

export { CreateTaskModal };
