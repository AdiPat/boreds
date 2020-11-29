import { Grid, TextField, IconButton, InputProps } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AddBoxIcon from "@material-ui/icons/AddBox";

const useStyles = makeStyles((theme) => ({
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    paddingRight: 0,
    paddingLeft: theme.spacing(2),
    marginLeft: theme.spacing(11),
    marginTop: theme.spacing(2),
    alignItems: "flex-start",
    ["@media (max-width: 400px)"]: {
      marginLeft: theme.spacing(7),
    },
  },
}));

function ActivityInputField() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.inputContainer}>
      <Grid container>
        <Grid item md={10} sm={10} xs={10}>
          <TextField
            label="Enter Task Activity"
            variant="outlined"
            style={{ width: "100%" }}
            InputProps={{
              endAdornment: (
                <IconButton color="secondary" size="medium">
                  <AddBoxIcon
                    size="medium"
                    style={{ height: "40px", width: "40px" }}
                  />
                </IconButton>
              ),
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export { ActivityInputField };
