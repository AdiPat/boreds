import { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import firebase from "firebase/app";
import "firebase/auth";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      console.log(user.email);
    } else {
      console.log("User not signed in.");
    }
  }, []);

  const handleSubmit = (e) => {
    console.log(email, password);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <Grid
      style={{ minHeight: "100vh" }}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12} md={4}>
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
                type="password"
                size="medium"
                onChange={(e) => setPassword(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <Button
                style={{ width: "100%" }}
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Log in
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}

export { LoginPage };
