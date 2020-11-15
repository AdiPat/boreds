import { useTheme } from "@material-ui/core/styles";
import { MenuItem, Typography, IconButton, Divider } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";

function NotificationsMenuItem(props) {
  const theme = useTheme();
  return (
    <div>
      <MenuItem
        style={{
          display: "flex",
          flexDirection: "column",
          padding: theme.spacing(2),
          whiteSpace: "normal",
          alignItems: "flex-start",
          transitionDuration: "0s",
        }}
        disableTouchRipple={true}
      >
        {!props.emptyMessage ? (
          <Typography variant="body1">
            <strong>{props.fromEmail}</strong> has invited you to collaborate on
            board <strong>{props.boardTitle}</strong>.
          </Typography>
        ) : (
          <Typography variant="body1">You have no notifications.</Typography>
        )}
        {!props.emptyMessage ? (
          <div>
            <IconButton style={{ color: green[500] }}>
              <CheckCircleOutlineRoundedIcon color="inherit" />
            </IconButton>
            <IconButton style={{ color: red[500] }}>
              <CancelOutlinedIcon color="inherit" />
            </IconButton>
          </div>
        ) : null}
      </MenuItem>
      <Divider />
    </div>
  );
}

export { NotificationsMenuItem };
