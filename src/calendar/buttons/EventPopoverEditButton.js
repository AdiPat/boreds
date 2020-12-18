import PropTypes from "prop-types";
import { Tooltip, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

function EventPopoverEditButton({ onClick }) {
  return (
    <Tooltip
      style={{ marginLeft: "auto" }}
      title="Edit"
      aria-label="edit-event-tooltip"
    >
      <IconButton size="medium" aria-label="edit-event" onClick={onClick}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
}

EventPopoverEditButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export { EventPopoverEditButton };
