import { useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Button,
  Snackbar,
  Divider,
  TextField,
} from "@material-ui/core";
import { getCurrentUser } from "../../services/user";
import { checkDuplicateInvite, createInvite } from "../../services/invite";
import * as EmailValidator from "email-validator";
import { SimpleModal } from "./SimpleModal";

function InviteModal(props) {
  const theme = useTheme();
  const [userInviteEmail, setUserInviteEmail] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const _resetParams = (msg) => {
    setSnackbarMessage(msg);
    setOpenSnackbar(true);
    setUserInviteEmail("");
  };

  // TODO: cleanup this function
  const handleInviteUser = () => {
    // inviteUser();
    const user = getCurrentUser();
    const userEmail = user.email;
    const isEmailValid = EmailValidator.validate(userInviteEmail);
    if (isEmailValid) {
      checkDuplicateInvite(userEmail, userInviteEmail, props.boardId).then(
        (foundDuplicates) => {
          if (foundDuplicates) {
            console.log("found duplicate invites: ", foundDuplicates);
            _resetParams(`You have already invited ${userInviteEmail}`);
          } else {
            createInvite(userEmail, userInviteEmail, props.boardId)
              .then((creationSuccessful) => {
                if (creationSuccessful) {
                  _resetParams(`Invited user ${userInviteEmail}`);
                } else {
                  _resetParams(`Failed to invite user ${userInviteEmail}`);
                }
              })
              .catch((err) => {
                _resetParams(`Failed to invite user ${userInviteEmail}`);
              });
          }
        }
      );
    } else {
      console.log("email not validated: ", userInviteEmail);
      _resetParams(`Invalid email ${userInviteEmail}`);
    }
    props.handleCloseModal();
  };

  return (
    <div>
      <SimpleModal
        openModal={props.openModal}
        handleCloseModal={props.handleCloseModal}
      >
        <Grid container direction="column" justify="center">
          <Grid item xs={12} style={{ padding: theme.spacing(2, 4) }}>
            <Typography variant="body1">
              <strong>Invite User</strong>
            </Typography>
          </Grid>
          <Divider />
          <Grid item xs={12} style={{ padding: theme.spacing(1, 4, 4, 4) }}>
            <TextField
              label="Enter email"
              placeholder="Enter email"
              value={userInviteEmail}
              onChange={(e) => setUserInviteEmail(e.target.value)}
              style={{ width: "100%" }}
            />
          </Grid>
          <Divider />
          <Grid item xs={12} style={{ padding: theme.spacing(2) }}>
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
      </SimpleModal>
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
