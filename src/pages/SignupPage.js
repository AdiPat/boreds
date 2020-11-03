import { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../providers/UserContext";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Alert from "@material-ui/lab/Alert";
import firebase from "firebase/app";
import "firebase/auth";

function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const user = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        console.log("SignupPage: Created user - ", userAuth);
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        setErrorMessage(error.message);
        console.log(errorCode, error.message);
      });
  };

  return user == null ? (
    <Grid
      style={{ minHeight: "100vh", backgroundColor: "#ececec" }}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12} md={4}>
        <form onSubmit={handleSubmit}>
          <Card style={{ padding: "20px" }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography align="center" variant="h6">
                  Sign Up for Boreds
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  style={{ width: "100%" }}
                  label="Enter full name"
                  type="text"
                  size="medium"
                  onChange={(e) => setFullName(e.target.value)}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  style={{ width: "100%" }}
                  label="Enter email address"
                  type="text"
                  size="medium"
                  onChange={(e) => setEmail(e.target.value)}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  style={{ width: "100%" }}
                  label="Create password"
                  type={showPassword ? "text" : "password"}
                  size="medium"
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                {errorMessage !== "" ? (
                  <Alert severity="error">{errorMessage}</Alert>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <Button
                  style={{ width: "100%" }}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Sign Up
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button color="primary">
                  <a href="/login" style={{ textDecoration: "none" }}>
                    Already have an account? Log in
                  </a>
                </Button>
              </Grid>
            </Grid>
          </Card>
        </form>
      </Grid>
    </Grid>
  ) : (
    <Redirect to="/dashboard" />
  );
}

export { SignupPage };
