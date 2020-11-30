import { useState } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  TextField,
  IconButton,
  InputProps,
  Snackbar,
} from "@material-ui/core";
import { lightGreen } from "@material-ui/core/colors";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { addTaskActivity } from "../services/tasks-activity";

const useStyles = makeStyles((theme) => ({
  inputContainer: {
    paddingLeft: theme.spacing(2),
    alignItems: "flex-start",
  },
}));

function ActivityInputField(props) {
  const classes = useStyles();
  const [activityText, setActivityText] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const theme = useTheme();

  const handleTextChange = (e) => {
    setActivityText(e.target.value);
  };

  const handleActivitySubmit = () => {
    // TODO: Figure out how to add position (last parameter)
    addTaskActivity(props.taskId, activityText, 0).then((result) => {
      if (!result.status && result.message) {
        setOpenSnackbar(true);
        setSnackbarMessage(result.message);
      }
      setActivityText("");
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleActivitySubmit();
    }
  };

  return props.taskId ? (
    <Grid container className={classes.inputContainer}>
      <Grid item md={6} sm={8} xs={10}>
        <TextField
          label="Enter Task Activity"
          variant="outlined"
          style={{ width: "100%" }}
          value={activityText}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          InputProps={{
            endAdornment: (
              <IconButton
                size="medium"
                disableFocusRipple
                onClick={handleActivitySubmit}
              >
                <AddBoxIcon
                  size="medium"
                  style={{
                    height: "40px",
                    width: "40px",
                    color: lightGreen[700],
                  }}
                />
              </IconButton>
            ),
          }}
        />
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={openSnackbar}
        onClose={(event, reason) => {
          setOpenSnackbar(false);
        }}
        autoHideDuration={3000}
        message={snackbarMessage}
      />
    </Grid>
  ) : null;
}

ActivityInputField.propTypes = {
  taskId: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.oneOf([null]).isRequired,
    PropTypes.oneOf([undefined]).isRequired,
  ]).isRequired,
};

export { ActivityInputField };
