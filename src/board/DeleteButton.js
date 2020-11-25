import { useTheme } from "@material-ui/core/styles";
import { Button, Typography, useMediaQuery } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";

function DeleteButton(props) {
  const theme = useTheme();
  const mediaQueryBelowXs = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Button
      variant="outlined"
      style={{
        marginRight: theme.spacing(2),
        color: red[600],
        borderColor: red[600],
      }}
      onClick={props.handleDelete}
    >
      <DeleteIcon style={{ marginRight: theme.spacing(1) }} />
      {!mediaQueryBelowXs ? (
        <Typography variant="body1">Delete</Typography>
      ) : null}
    </Button>
  );
}

export { DeleteButton };
