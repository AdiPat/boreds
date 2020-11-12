import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { PasswordReset } from "./PasswordReset";

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
      <PasswordReset />
    </Grid>
  );
}

export { ProfileContent };
