import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal,
  Backdrop,
  Grid,
  Typography,
  Fade,
  Button,
  Snackbar,
} from "@material-ui/core";
import { deleteBoard } from "../services/board";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: "none",
    borderRadius: "5px",
  },
  modalTitle: {
    marginBottom: theme.spacing(2),
  },
}));

function DeleteBoardModal(props) {
  const classes = useStyles();
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleDeleteBoard = () => {
    deleteBoard(props.userId, props.boardId);
    setSnackbarMessage(`Deleted board ${props.boardTitle}`);
    setOpenSnackbar(true);
    props.handleCloseModal();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.openModal}
        onClose={props.handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.openModal}>
          <div className={classes.paper}>
            <Grid container direction="column" justify="center">
              <Grid item xs={12}>
                <Typography variant="body1" className={classes.modalTitle}>
                  Are you sure you want to delete "{props.boardTitle}" ?
                </Typography>
              </Grid>
              <Grid item xs={12} style={{ marginTop: "10px" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  style={{ marginRight: "10px" }}
                  onClick={handleDeleteBoard}
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
          </div>
        </Fade>
      </Modal>
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

export { DeleteBoardModal };
