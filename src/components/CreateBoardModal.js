import { React, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import AppContext from "../providers/AppContext";
import { getCurrentUser } from "../services/user";
import { addNewBoard } from "../services/board";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
  },
}));

function CreateBoardModal(props) {
  const classes = useStyles();
  const [newBoardName, setNewBoardName] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { state, setBoardsList } = useContext(AppContext);
  const boardsList = state.boardsList;

  const handleChange = (e) => {
    setNewBoardName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newBoardName === "") {
      setSnackbarMessage("Board title empty");
      setOpenSnackbar(true);
      return;
    }
    const user = getCurrentUser();
    addNewBoard(user.uid, newBoardName).then(() => {
      setTimeout(() => {
        window.location.reload(false);
      }, 2000); // reload page so that board listener is added
    });
    setSnackbarMessage(`Board ${newBoardName} created`);
    setOpenSnackbar(true);
    setNewBoardName("");
    props.handleCloseModal();
    //window.location.reload(false);
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
            <form onSubmit={handleSubmit}>
              <Grid container direction="column" justify="center">
                <Grid item xs={12}>
                  <TextField
                    label="Add board title"
                    variant="outlined"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} style={{ marginTop: "10px" }}>
                  <Button type="submit" variant="contained" color="primary">
                    Create board
                  </Button>
                </Grid>
              </Grid>
            </form>
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
          setOpenSnackbar(false);
        }}
        autoHideDuration={3000}
        message={snackbarMessage}
      />
    </div>
  );
}

export { CreateBoardModal };
