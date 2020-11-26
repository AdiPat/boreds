import { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid, Typography, Button, Snackbar, Divider } from "@material-ui/core";
import { SimpleModal } from "./SimpleModal";
import { deleteBoard } from "../../services/board";

const useStyles = makeStyles((theme) => ({
  modalTitle: {
    fontWeight: "600",
  },
}));

function DeleteBoardModal(props) {
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

  const handleDeleteBoard = () => {
    deleteBoard(props.userId, props.boardId);
    resetParams(`Deleted board ${props.boardTitle}`);
    if (props.redirectUrl) {
      setTimeout(() => history.push(props.redirectUrl), 500);
    }
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
              Are you sure you want to delete "{props.boardTitle}" ?
            </Typography>
          </Grid>

          <Divider />
          <Grid
            item
            xs={12}
            style={{
              // marginTop: theme.spacing(3),
              padding: theme.spacing(3, 4),
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              size="large"
              style={{ marginRight: theme.spacing(2) }}
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

DeleteBoardModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  boardTitle: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
};

DeleteBoardModal.defaultProps = {
  openModal: false,
};

export { DeleteBoardModal };
