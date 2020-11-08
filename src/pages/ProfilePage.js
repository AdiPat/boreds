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

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    margin: theme.spacing(10),
    padding: theme.spacing(2),
  },
}));

function Profile(props) {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AppContext);
  const classes = useStyles();

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  });

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
          <Grid item xs={12} style={{ marginBottom: "5px" }}>
            <TextField
              variant="outlined"
              placeholder="Enter old password"
              type="text"
              size="medium"
              label="Old Password"
            ></TextField>
          </Grid>
          <Grid item xs={12} style={{ marginBottom: "5px" }}>
            <TextField
              variant="outlined"
              placeholder="Enter new password"
              type="text"
              size="medium"
              label="New Password"
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <Button color="secondary" variant="contained">
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
