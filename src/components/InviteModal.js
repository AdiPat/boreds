import { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Modal,
  Backdrop,
  Grid,
  Typography,
  Fade,
  Button,
  Snackbar,
  Divider,
  TextField,
} from "@material-ui/core";
import { getCurrentUser } from "../services/user";
import { createInvite } from "../services/invite";
import * as EmailValidator from "email-validator";

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

function InviteModal(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [userInviteEmail, setUserInviteEmail] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleInviteUser = () => {
    // inviteUser();
    const user = getCurrentUser();
    const userEmail = user.email;
    if (EmailValidator.validate(userInviteEmail)) {
      console.log("email validated: ", userInviteEmail);
      createInvite(userEmail, userInviteEmail, props.boardId);
      setSnackbarMessage(`Invited user ${userInviteEmail}`);
      setOpenSnackbar(true);
    } else {
      console.log("email not validated: ", userInviteEmail);
      setSnackbarMessage(`Invalid email ${userInviteEmail}`);
      setOpenSnackbar(true);
    }
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
              <Grid item xs={12} style={{ marginBottom: theme.spacing(1) }}>
                <Typography variant="body1" className={classes.modalTitle}>
                  <strong>Invite User</strong>
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Enter email"
                  placeholder="Enter email"
                  value={userInviteEmail}
                  onChange={(e) => setUserInviteEmail(e.target.value)}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} style={{ marginTop: theme.spacing(4) }}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  style={{ marginRight: theme.spacing(2) }}
                  onClick={handleInviteUser}
                >
                  Invite
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  color="secondary"
                  onClick={props.handleCloseModal}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
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

export { InviteModal };
