import { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
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

  return (
    <Toolbar variant="regular" className={classes.toolbar}>
      <ToolbarTitle title={props.boardTitle} />
      <VisibilityButton public={props.public} />
      <InviteButton boardId={props.boardId} />
      <DeleteButton
        userId={props.userId}
        boardId={props.boardId}
        boardTitle={props.boardTitle}
      />
      <StarButton />
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
