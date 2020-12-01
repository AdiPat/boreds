import { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid, Typography, Button, Snackbar, Divider } from "@material-ui/core";
import { SimpleModal } from "./SimpleModal";
import { deleteTask } from "../../services/tasks";

const useStyles = makeStyles((theme) => ({
  modalTitle: {
    fontWeight: "600",
  },
}));

function DeleteTaskModal(props) {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const resetParams = (snackbarMsg) => {
    setSnackbarMessage(snackbarMsg);
    setOpenSnackbar(true);
    props.handleCloseModal();
  };

  const handleDeleteTask = () => {
    const successMsg = `Deleted task "${props.taskTitle}"`;
    const errorMsg = `Failed to delete task ${props.taskTitle}`;

    deleteTask(props.taskId).then((status) => {
      if (status) {
        resetParams(successMsg);
        setTimeout(() => history.push("/tasks"), 500);
      } else {
        resetParams(errorMsg);
      }
    });
  };

  return (
    <div>
      <SimpleModal
        openModal={props.openModal}
        handleCloseModal={props.handleCloseModal}
      >
        <Grid container direction="column" justify="center">
          <Grid item xs={12} style={{ padding: theme.spacing(4) }}>
            <Typography variant="body1" className={classes.modalTitle}>
              Are you sure you want to delete "{props.taskTitle}" ?
            </Typography>
            <Typography variant="subtitle2">
              Note: This operation cannot be undone.
            </Typography>
          </Grid>

          <Divider />
          <Grid
            item
            xs={12}
            style={{
              padding: theme.spacing(3, 4),
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              size="large"
              style={{ marginRight: theme.spacing(2) }}
              onClick={handleDeleteTask}
            >
              Yes
            </Button>
            <Button
              variant="outlined"
              size="large"
              color="secondary"
              onClick={props.handleCloseModal}
            >
              No
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
          setTimeout(() => setOpenSnackbar(false), 3000);
        }}
        autoHideDuration={3000}
        message={snackbarMessage}
      />
    </div>
  );
}

DeleteTaskModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  taskTitle: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
};

DeleteTaskModal.defaultProps = {
  openModal: false,
};

export { DeleteTaskModal };
