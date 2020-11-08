import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import firebase from "firebase/app";
import AppContext from "../providers/AppContext";
import { CircularLoader } from "../components/CircularLoader";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
    // redirect to dashboard
    if (user) {
      history.push("/dashboard");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebase.auth().currentUser;
        firebase
          .database()
          .ref(`users/${user.uid}`)
          .once("value")
          .then((snapshot) => {
            console.log("Login: Snapshot - ", snapshot.val());
            if (snapshot.val() === null) {
              console.log("There is no data for this user. Addding.");
              const user = firebase.auth().currentUser;
              firebase.database().ref(`users/${user.uid}`).set({
                userId: user.uid,
                displayName: user.displayName,
                email: user.email,
                boards: [],
              });
            }
          });
      })
      .catch(function (error) {
        let errorCode = error.code;
        setErrorMessage(error.message);
        console.log(errorCode, errorMessage);
      });
  };

  return isLoading ? (
    <CircularLoader color="secondary" />
  ) : (
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
                  Log in to Boreds
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  style={{ width: "100%" }}
                  label="Email"
                  type="text"
                  size="medium"
                  onChange={(e) => setEmail(e.target.value)}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  style={{ width: "100%" }}
                  label="Password"
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
                <Button
                  style={{ width: "100%" }}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Log in
                </Button>
              </Grid>
              <Grid item xs={12}>
                {errorMessage !== "" ? (
                  <Alert severity="error">{errorMessage}</Alert>
                ) : null}
              </Grid>
              <Grid item xs={4}>
                <Button color="primary">
                  <a href="/forgot" style={{ textDecoration: "none" }}>
                    Can't Log in?
                  </a>
                </Button>
              </Grid>
              <Grid item xs={8}>
                <Button color="primary">
                  <a href="/signup" style={{ textDecoration: "none" }}>
                    Sign up for an account
                  </a>
                </Button>
              </Grid>
            </Grid>
          </Card>
        </form>
      </Grid>
    </Grid>
  );
}

export { LoginPage };
