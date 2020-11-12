import { useState } from "react";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import LockIcon from "@material-ui/icons/Lock";
import firebase from "firebase/app";

function PasswordReset(props) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleClick = () => {
    let user = firebase.auth().currentUser;
    let credential = firebase.auth.EmailAuthProvider.credential(
      firebase.auth().currentUser.email,
      oldPassword
    );
    user
      .reauthenticateWithCredential(credential)
      .then(() => {
        console.log("Password verified.");
        user
          .updatePassword(newPassword)
          .then(() => {
            console.log("Password changed!");
            setErrorMessage("");
            setSuccessMessage("Password changed successfully.");
          })
          .catch((error) => {
            console.log("Unable to change password.");
            console.log(error);
            setErrorMessage(error.message);
            setSuccessMessage("");
          });
      })
      .catch((error) => {
        console.log("Password not verified.");
        console.log(error);
        setErrorMessage(error.message);
        setSuccessMessage("");
      });
  };

  return (
    <Grid item container>
      <Grid item xs={12}>
        <Typography
          variant="body1"
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <LockIcon style={{ marginRight: "8px" }} />
          <strong>Password Reset</strong>
        </Typography>
      </Grid>
      <Grid item xs={12} style={{ marginBottom: "16px" }}>
        <TextField
          variant="outlined"
          placeholder="Enter old password"
          type="password"
          size="medium"
          label="Old Password"
          onChange={(e) => setOldPassword(e.target.value)}
        ></TextField>
      </Grid>
      <Grid item xs={12} style={{ marginBottom: "16px" }}>
        <TextField
          variant="outlined"
          placeholder="Enter new password"
          type="password"
          size="medium"
          label="New Password"
          onChange={(e) => setNewPassword(e.target.value)}
        ></TextField>
      </Grid>
      {errorMessage !== "" ? (
        <Grid item xs={4}>
          <Alert severity="error">{errorMessage}</Alert>
        </Grid>
      ) : null}
      {successMessage !== "" ? (
        <Grid item xs={4}>
          <Alert severity="success">{successMessage}</Alert>
        </Grid>
      ) : null}
      <Grid item xs={12} style={{ marginTop: "8px" }}>
        <Button color="secondary" variant="contained" onClick={handleClick}>
          Change Password
        </Button>
      </Grid>
    </Grid>
  );
}

export { PasswordReset };
