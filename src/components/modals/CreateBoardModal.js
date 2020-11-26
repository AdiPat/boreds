import { React, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Button, Snackbar } from "@material-ui/core";
import { SimpleModal } from "./SimpleModal";
import { getCurrentUser } from "../../services/user";
import { addNewBoard } from "../../services/board";

const BOARD_TITLE_MAX_LENGTH = 100;

const useStyles = makeStyles((theme) => ({}));

function CreateBoardModal(props) {
  const classes = useStyles();
  const [newBoardName, setNewBoardName] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleTitleChange = (e) => {
    setNewBoardName(e.target.value);
  };

  const resetParams = (snackbarMsg) => {
    setSnackbarMessage(snackbarMsg);
    setOpenSnackbar(true);
    setNewBoardName("");
    props.handleCloseModal();
  };

  const createBoard = async (userId, boardTitle) => {
    addNewBoard(userId, newBoardName)
      .then((result) => {
        const status = result.data.status;
        if (status) {
          resetParams(`Board ${newBoardName} created.`);
          console.log("Created new board.");
        } else {
          resetParams(`Couldn't create ${newBoardName}. Try again later.`);
          console.log(`Failed to create new board ${boardTitle}`);
        }
      })
      .catch((err) => {
        if (err.code != "internal") {
          resetParams(err.message);
        } else {
          resetParams(`Couldn't create ${newBoardName}. Try again later.`);
        }
        console.error("Failed to create new board. ", err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newBoardName === "") {
      resetParams("Board title empty");
    } else if (newBoardName.length > BOARD_TITLE_MAX_LENGTH) {
      resetParams(
        `Board title should be less than ${BOARD_TITLE_MAX_LENGTH} characters.`
      );
    } else {
      const user = getCurrentUser();
      createBoard(user.uid, newBoardName);
    }
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
                label="Add board title"
                variant="outlined"
                value={newBoardName}
                onChange={handleTitleChange}
              />
            </Grid>
            <Grid item xs={12} style={{ marginTop: "10px" }}>
              <Button type="submit" variant="contained" color="primary">
                Create board
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

CreateBoardModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
};

CreateBoardModal.defaultProps = {
  openModal: false,
};

export { CreateBoardModal };
