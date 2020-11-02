import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [linkSent, setLinkSent] = useState(false);

  const handleOnClick = () => {
    // TODO: Send email
    console.log("Sending email to ", email);
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
              <Typography>
                {linkSent
                  ? "We sent a recovery link to your email address"
                  : "We'll send a recovery link to"}
              </Typography>
              {linkSent ? (
                <Typography align="center" variant="h5">
                  <br />
                  {email}
                </Typography>
              ) : (
                ""
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
