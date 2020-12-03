import PropTypes from "prop-types";
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
import { createTaskInvite } from "../../services/invite";
import { SimpleModal } from "./SimpleModal";

function TasksInviteModal(props) {
  const theme = useTheme();
  const [userInviteEmail, setUserInviteEmail] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const _resetParams = (msg, clearEmail = false) => {
    setSnackbarMessage(msg);
    setOpenSnackbar(true);
    if (clearEmail) {
      setUserInviteEmail("");
    }
  };

  // TODO: cleanup this function
  const handleInviteUser = () => {
    if (props.taskId) {
      createTaskInvite(userInviteEmail, props.taskId).then((result) => {
        if (result.status) {
          _resetParams(`Successfully sent invite to ${userInviteEmail}`, true);
          props.handleCloseModal();
        } else {
          _resetParams(result.message);
          // invite already sent, close modal
          if (result.code == "already-exists") {
            props.handleCloseModal();
          }
        }
      });
    }
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
              onChange={(e) => setUserInviteEmail(e.target.value.toLowerCase())}
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

TasksInviteModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  taskId: PropTypes.string.isRequired,
};

TasksInviteModal.defaultProps = {
  openModal: false,
  taskId: undefined,
};

export { TasksInviteModal };
