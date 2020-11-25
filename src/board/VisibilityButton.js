import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import { Button, Typography, useMediaQuery } from "@material-ui/core";
import PublicIcon from "@material-ui/icons/Public";
import LockIcon from "@material-ui/icons/Lock";

function VisibilityButton(props) {
  const theme = useTheme();
  const mediaQueryBelowXs = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Button
      variant="outlined"
      color="primary"
      style={{ marginRight: "16px" }}
      onClick={props.openVisbilityMenu}
    >
      {props.public ? (
        <PublicIcon style={{ marginRight: theme.spacing(1) }} />
      ) : (
        <LockIcon style={{ marginRight: theme.spacing(1) }} />
      )}
      {!mediaQueryBelowXs ? (
        <Typography variant="body1">
          {props.public ? "Public" : "Private"}
        </Typography>
      ) : null}
    </Button>
  );
}

VisibilityButton.propTypes = {
  openVisbilityMenu: PropTypes.func.isRequired,
  public: PropTypes.bool.isRequired,
};

export { VisibilityButton };
