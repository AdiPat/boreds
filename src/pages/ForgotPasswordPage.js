import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import firebase from "firebase/app";
import UserContext from "../providers/UserContext";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [linkSent, setLinkSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const user = useContext(UserContext);

  useEffect(() => {
    if (user) {
      history.push("/dashboard");
    }
  });

  const handleOnClick = () => {
    // TODO: Send email
    console.log("Sending email to ", email);
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setLinkSent(true);
      })
      .catch((error) => {
        setLinkSent(false);
        setErrorMessage(error.message);
        console.log(error.code, error.message);
      });

    setLinkSent(true);
  };

  return (
    <Grid
      style={{ minHeight: "100vh", backgroundColor: "#ececec" }}
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
                Can't log in?
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {linkSent && errorMessage === "" ? (
                <Alert severity="success">
                  We sent a recovery link to {email}
                </Alert>
              ) : (
                <Typography>We'll send a recovery link to</Typography>
              )}
              {!linkSent ? (
                <TextField
                  style={{ width: "100%" }}
                  label="Email"
                  type="text"
                  size="medium"
                  onChange={(e) => setEmail(e.target.value)}
                ></TextField>
              ) : (
                ""
              )}
            </Grid>
            {!linkSent ? (
              <Grid item xs={12}>
                <Button
                  style={{ width: "100%" }}
                  variant="contained"
                  color="primary"
                  onClick={handleOnClick}
                >
                  Send recovery link
                </Button>
              </Grid>
            ) : (
              ""
            )}

            {errorMessage !== "" ? (
              <Grid item xs={12}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
            ) : null}

            <Grid item xs={12}>
              <Button color="primary">
                <a href="/login" style={{ textDecoration: "none" }}>
                  Return to log in
                </a>
              </Button>
            </Grid>
            {linkSent ? (
              <Grid item xs={12}>
                <Button color="primary">
                  <a href="/forgot" style={{ textDecoration: "none" }}>
                    Resend recovery link
                  </a>
                </Button>
              </Grid>
            ) : (
              <hr />
            )}
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}

export { ForgotPasswordPage };
