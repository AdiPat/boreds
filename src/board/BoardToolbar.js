import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Toolbar, Typography, Button, useMediaQuery } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import LockIcon from "@material-ui/icons/Lock";
import PublicIcon from "@material-ui/icons/Public";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    border: "1px solid",
    borderColor: grey[300],
    borderRadius: "5px",
    position: "fixed",
    top: theme.spacing(11),
    left: theme.spacing(12),
    // marginLeft: theme.spacing(1),
    marginRight: theme.spacing(3),
    ["@media (max-width: 400px)"]: {
      left: theme.spacing(8),
    },
  },
}));

function BoardToolbar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const mediaQueryBelowXs = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Toolbar variant="regular" className={classes.toolbar}>
      {!mediaQueryBelowXs ? (
        <Typography type="h6" style={{ marginRight: theme.spacing(2) }}>
          <strong>{props.boardTitle}</strong>
        </Typography>
      ) : null}
      <Button
        variant="outlined"
        color="primary"
        style={{ marginRight: "16px" }}
      >
        {props.private ? (
          <LockIcon style={{ marginRight: theme.spacing(1) }} />
        ) : (
          <PublicIcon style={{ marginRight: theme.spacing(1) }} />
        )}
        {!mediaQueryBelowXs ? (
          <Typography variant="body1">
            {props.private ? "Private" : "Public"}
          </Typography>
        ) : null}
      </Button>
      <Button
        variant="outlined"
        color="primary"
        style={{ marginRight: theme.spacing(2) }}
      >
        <GroupAddIcon style={{ marginRight: theme.spacing(1) }} />
        {!mediaQueryBelowXs ? (
          <Typography variant="body1">Invite</Typography>
        ) : null}
      </Button>
      <Button
        variant="outlined"
        color="primary"
        style={{ marginRight: theme.spacing(2) }}
      >
        <DeleteIcon style={{ marginRight: theme.spacing(1) }} />
        {!mediaQueryBelowXs ? (
          <Typography variant="body1">Delete</Typography>
        ) : null}
      </Button>
    </Toolbar>
  );
}

export { BoardToolbar };
