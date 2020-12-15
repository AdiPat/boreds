import PropTypes from "prop-types";
import { grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { Tooltip, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  eventChipPaper: {
    padding: theme.spacing(1),
    overflow: "hidden",
    whiteSpace: "nowrap",
    "&:hover": {
      backgroundColor: grey[300],
      cursor: "pointer",
    },
  },
}));

function CalendarEventChip({ title, style }) {
  const classes = useStyles();

  return (
    <Tooltip title={title} aria-label="event-info">
      <div style={{ margin: 0, boxSizing: "border-box", ...style }}>
        <Paper className={classes.eventChipPaper} elevation={2}>
          {title}
        </Paper>
      </div>
    </Tooltip>
  );
}

CalendarEventChip.propTypes = {
  title: PropTypes.string.isRequired,
};

export { CalendarEventChip };
