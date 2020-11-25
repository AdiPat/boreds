import { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { DeleteBoardModal } from "../components/modals/DeleteBoardModal";
import { InviteModal } from "../components/InviteModal";
import { VisibilityMenu } from "./VisibilityMenu";
import { VisibilityButton } from "./VisibilityButton";
import { InviteButton } from "./InviteButton";
import { DeleteButton } from "./DeleteButton";
import { StarButton } from "./StarButton";
import { ToolbarTitle } from "./ToolbarTitle";
import { starBoard, unstarBoard } from "../services/board";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    border: "1px solid",
    borderColor: grey[300],
    borderRadius: "5px",
    position: "fixed",
    top: theme.spacing(11),
    left: theme.spacing(12),
    // marginLeft: theme.spacing(1),
    marginRight: theme.spacing(3),
    ["@media (max-width: 400px)"]: {
      left: theme.spacing(8),
    },
  },
}));

function BoardToolbar(props) {
  const classes = useStyles();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const [visibilityMenuAnchorEl, setVisibilitMenuAnchorEl] = useState(null);

  const handleDelete = () => {
    setOpenDeleteModal(true);
  };

  const handleInvite = () => {
    setOpenInviteModal(true);
  };

  const openVisbilityMenu = (event) => {
    setVisibilitMenuAnchorEl(event.target);
  };

  const closeVisibilitMenu = () => {
    setVisibilitMenuAnchorEl(null);
  };

  const handleStarFlip = () => {
    if (props.starred) {
      unstarBoard(props.userId, props.boardId);
    } else {
      starBoard(props.userId, props.boardId);
    }
  };

  return (
    <Toolbar variant="regular" className={classes.toolbar}>
      <ToolbarTitle title={props.boardTitle} />
      <VisibilityButton
        openVisbilityMenu={openVisbilityMenu}
        public={props.public}
      />
      <InviteButton handleInvite={handleInvite} />
      <DeleteButton handleDelete={handleDelete} />
      <StarButton handleStarFlip={handleStarFlip} />

      <DeleteBoardModal
        handleOpenModal={() => setOpenDeleteModal(true)}
        handleCloseModal={() => setOpenDeleteModal(false)}
        openModal={openDeleteModal}
        boardTitle={props.boardTitle}
        userId={props.userId}
        boardId={props.boardId}
        redirectUrl="/dashboard"
      />
      <InviteModal
        handleOpenModal={() => setOpenInviteModal(true)}
        handleCloseModal={() => setOpenInviteModal(false)}
        openModal={openInviteModal}
        boardId={props.boardId}
      />
      <VisibilityMenu
        handleClose={closeVisibilitMenu}
        anchorEl={visibilityMenuAnchorEl}
        userId={props.userId}
        boardId={props.boardId}
      />
    </Toolbar>
  );
}

BoardToolbar.propTypes = {
  userId: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
  public: PropTypes.bool.isRequired,
  starred: PropTypes.bool.isRequired,
};

export { BoardToolbar };
