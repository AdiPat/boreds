import { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Toolbar,
  Typography,
  Button,
  useMediaQuery,
  IconButton,
} from "@material-ui/core";
import { grey, red, yellow } from "@material-ui/core/colors";
import LockIcon from "@material-ui/icons/Lock";
import PublicIcon from "@material-ui/icons/Public";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import DeleteIcon from "@material-ui/icons/Delete";
import { DeleteBoardModal } from "../components/DeleteBoardModal";
import { InviteModal } from "../components/InviteModal";
import { VisibilityMenu } from "./VisibilityMenu";
import { VisibilityButton } from "./VisibilityButton";
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
  deleteButton: {
    marginRight: theme.spacing(2),
    color: red[600],
    borderColor: red[600],
  },
  starIcon: {
    color: yellow[700],
  },
}));

function BoardToolbar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const [visibilityMenuAnchorEl, setVisibilitMenuAnchorEl] = useState(null);
  const mediaQueryBelowXs = useMediaQuery(theme.breakpoints.down("xs"));

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
      {!mediaQueryBelowXs ? (
        <Typography type="h6" style={{ marginRight: theme.spacing(2) }}>
          <strong>{props.boardTitle}</strong>
        </Typography>
      ) : null}
      <VisibilityButton
        openVisbilityMenu={openVisbilityMenu}
        public={props.public}
      />
      <Button
        variant="outlined"
        color={"primary"}
        style={{ marginRight: theme.spacing(2) }}
        onClick={handleInvite}
      >
        <GroupAddIcon style={{ marginRight: theme.spacing(1) }} />
        {!mediaQueryBelowXs ? (
          <Typography variant="body1">Invite</Typography>
        ) : null}
      </Button>
      <Button
        variant="outlined"
        className={classes.deleteButton}
        onClick={handleDelete}
      >
        <DeleteIcon style={{ marginRight: theme.spacing(1) }} />
        {!mediaQueryBelowXs ? (
          <Typography variant="body1">Delete</Typography>
        ) : null}
      </Button>
      <IconButton onClick={handleStarFlip}>
        {props.starred ? (
          <StarIcon className={classes.starIcon} />
        ) : (
          <StarBorderIcon />
        )}
      </IconButton>

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

export { BoardToolbar };
