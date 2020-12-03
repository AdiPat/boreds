import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import { useState } from "react";
import { Button, Typography, useMediaQuery } from "@material-ui/core";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { TasksInviteModal } from "../../components/modals/TasksInviteModal";

function TasksInviteButton(props) {
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();
  const mediaQueryBelowXs = useMediaQuery(theme.breakpoints.down("xs"));

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return props.taskId ? (
    <div>
      <Button
        variant="outlined"
        color={"primary"}
        style={{ marginRight: theme.spacing(2) }}
        onClick={handleOpenModal}
      >
        <GroupAddIcon style={{ marginRight: theme.spacing(1) }} />
        {!mediaQueryBelowXs ? (
          <Typography variant="body1">Invite</Typography>
        ) : null}
      </Button>
      <TasksInviteModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        taskId={props.taskId}
      />
    </div>
  ) : null;
}

TasksInviteButton.propTypes = {
  taskId: PropTypes.string.isRequired,
};

TasksInviteButton.defaultProps = {
  taskId: null,
};

export { TasksInviteButton };
