import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import PersonAddRoundedIcon from "@material-ui/icons/PersonAddRounded";

function NotificationsMenuHeader(props) {
  const theme = useTheme();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: theme.spacing(1),
      }}
    >
      <PersonAddRoundedIcon style={{ marginRight: theme.spacing(1) }} />
      <Typography variant="h6">
        <strong>{props.headerTitle}</strong>
      </Typography>
    </div>
  );
}

NotificationsMenuHeader.propTypes = {
  headerTitle: PropTypes.string.isRequired,
};

export { NotificationsMenuHeader };
