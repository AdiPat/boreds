import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import { Button, Typography, useMediaQuery } from "@material-ui/core";
import GroupAddIcon from "@material-ui/icons/GroupAdd";

function InviteButton(props) {
  const theme = useTheme();
  const mediaQueryBelowXs = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Button
      variant="outlined"
      color={"primary"}
      style={{ marginRight: theme.spacing(2) }}
      onClick={props.handleInvite}
    >
      <GroupAddIcon style={{ marginRight: theme.spacing(1) }} />
      {!mediaQueryBelowXs ? (
        <Typography variant="body1">Invite</Typography>
      ) : null}
    </Button>
  );
}

InviteButton.propTypes = {
  handleInvite: PropTypes.func.isRequired,
};

export { InviteButton };
