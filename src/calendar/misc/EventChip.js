import { useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Tooltip, Paper } from "@material-ui/core";
import CONSTANTS from "../../utils/constants";
import { hashEventId } from "../../utils/util";
import { CalendarUIContext } from "../CalendarUIContext";

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

function EventChip({ style, chipColor, event }) {
  const classes = useStyles({ chipColor })();
  const btnId = hashEventId(event.id);
  const { eventPopover } = useContext(CalendarUIContext);

  return (
    <Tooltip title={event.title} aria-label="event-info">
      <div
        style={{ margin: 0, boxSizing: "border-box", ...style }}
        onClick={(e) => eventPopover.show(e, event)}
        id={btnId}
      >
        <Paper className={classes.eventChipPaper} elevation={2}>
          {event.title}
        </Paper>
      </div>
    </Tooltip>
  );
}

EventChip.propTypes = {
  event: PropTypes.object.isRequired,
  chipColor: PropTypes.object,
};

EventChip.defaultProps = {
  chipColor: CONSTANTS.CALENDAR.EVENT.colors.teal,
};

export { EventChip };
