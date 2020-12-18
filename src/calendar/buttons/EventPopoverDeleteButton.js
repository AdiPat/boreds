import PropTypes from "prop-types";
import { Tooltip, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

function EventPopoverDeleteButton({ onClick }) {
  return (
    <Tooltip title="Delete" aria-label="edit-event-tooltip">
      <IconButton size="medium" aria-label="delete-event" onClick={onClick}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
}

EventPopoverDeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export { EventPopoverDeleteButton };
