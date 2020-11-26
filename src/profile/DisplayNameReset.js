import { useState, useEffect } from "react";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import PersonIcon from "@material-ui/icons/Person";
import {
  getCurrentUser,
  getCurrentUserDisplayName,
  updateDisplayName,
} from "../services/user";

function DisplayNameReset(props) {
  const [displayReadCounter, setDisplayReadCounter] = useState(0);
  const [displayName, setDisplayName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleClick = async () => {
    const userId = getCurrentUser().uid;
    const oldDisplayName = await getCurrentUserDisplayName();
    console.log(displayName, oldDisplayName);
    if (displayName === "" || !displayName) {
      setErrorMessage("Display name is empty.");
      setSuccessMessage("");
    } else if (displayName === oldDisplayName) {
      setErrorMessage("Display name unchanged.");
      setSuccessMessage("");
    } else if (!displayName) {
      setErrorMessage("Enter display name.");
      setSuccessMessage("");
    } else {
      updateDisplayName(userId, displayName).then((status) => {
        console.log(status);
        if (status) {
          setSuccessMessage("Display name changed successfully.");
          setErrorMessage("");
        } else {
          setErrorMessage("Failed to update display name.");
          setSuccessMessage("");
        }
      });
    }
  };

  useEffect(() => {
    const effectFunc = async () => {
      const oldDisplayName = await getCurrentUserDisplayName();
      setDisplayReadCounter(displayReadCounter + 1);
      setDisplayName(oldDisplayName);
    };
    if (displayReadCounter < 1) {
      effectFunc();
    }
  });

  return (
    <Grid item container style={{ marginBottom: "24px" }}>
      <Grid item xs={12}>
        <Typography
          variant="body1"
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <PersonIcon style={{ marginRight: "8px" }} />
          <strong>Display Name</strong>
        </Typography>
      </Grid>
      <Grid item xs={12} style={{ marginBottom: "8px" }}>
        <TextField
          variant="outlined"
          placeholder={displayName}
          type="text"
          size="medium"
          value={displayName}
          label="Enter new name"
          onChange={(e) => setDisplayName(e.target.value)}
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
        <Button color="secondary" variant="outlined" onClick={handleClick}>
          Change Display Name
        </Button>
      </Grid>
    </Grid>
  );
}

export { DisplayNameReset };
