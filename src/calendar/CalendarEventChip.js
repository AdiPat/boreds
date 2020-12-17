import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Tooltip, Paper } from "@material-ui/core";
import CONSTANTS from "../utils/constants";
import { hashEventId } from "../utils/util";

const useStyles = ({ chipColor }) =>
  makeStyles((theme) => ({
    eventChipPaper: {
      padding: theme.spacing(1),
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      "&:hover": {
        backgroundColor: chipColor.hover,
        cursor: "pointer",
      },
      backgroundColor: chipColor.backgroundColor,
      color: chipColor.fontColor,
      fontWeight: "bold",
      fontSize: 12,
    },
  }));

function CalendarEventChip({ title, style, chipColor, event, eventPopover }) {
  const classes = useStyles({ chipColor })();
  const btnId = hashEventId(event.id);

  return (
    <Tooltip title={title} aria-label="event-info">
      <div
        style={{ margin: 0, boxSizing: "border-box", ...style }}
        onClick={(e) => eventPopover.handleOpen(e, event)}
        id={btnId}
      >
        <Paper className={classes.eventChipPaper} elevation={2}>
          {title}
        </Paper>
      </div>
    </Tooltip>
  );
}

CalendarEventChip.propTypes = {
  title: PropTypes.string.isRequired,
  chipColor: PropTypes.object,
};

CalendarEventChip.defaultProps = {
  chipColor: CONSTANTS.CALENDAR.EVENT.colors.teal,
};

export { CalendarEventChip };
