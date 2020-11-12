import { makeStyles } from "@material-ui/core/styles";
import { Grid, Divider } from "@material-ui/core";
import { PasswordReset } from "./PasswordReset";
import { DisplayNameReset } from "./DisplayNameReset";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    margin: theme.spacing(10),
    padding: theme.spacing(2),
  },
}));

function ProfileContent() {
  const classes = useStyles();

  return (
    <Grid container className={classes.content}>
      <DisplayNameReset style={{ marginBottom: "16px" }} />
      <PasswordReset />
    </Grid>
  );
}

export { ProfileContent };
