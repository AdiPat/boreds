import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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

  return (
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
              <TextField label="Add board title" variant="outlined" />
            </Grid>
            <Grid item xs={12} style={{ marginTop: "10px" }}>
              <Button variant="contained" color="primary">
                Create board
              </Button>
            </Grid>
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
}

export { CreateBoardModal };
