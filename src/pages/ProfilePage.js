import { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import AppContext from "../providers/AppContext";
import { CircularLoader } from "../components/CircularLoader";
import { DashDrawer } from "../components/DashDrawer";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import firebase from "firebase/app";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    margin: theme.spacing(10),
    padding: theme.spacing(2),
  },
}));

function Profile(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { user } = useContext(AppContext);
  const classes = useStyles();

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  });

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

  return isLoading ? (
    <CircularLoader color="secondary" />
  ) : user != null ? (
    <div>
      <DashDrawer />
      <Grid container className={classes.content}>
        <Grid item xs={12}>
          <Typography variant="h6">Welcome {user.displayName}</Typography>
        </Grid>
        <Grid item container>
          <Grid item xs={12}>
            <Typography variant="h6">Password Reset</Typography>
          </Grid>
          <Grid item xs={12} style={{ marginBottom: "8px" }}>
            <TextField
              variant="outlined"
              placeholder="Enter old password"
              type="password"
              size="medium"
              label="Old Password"
              onChange={(e) => setOldPassword(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item xs={12} style={{ marginBottom: "8px" }}>
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
      </Grid>
    </div>
  ) : (
    <Redirect to="/login" />
  );
}

export default Profile;
