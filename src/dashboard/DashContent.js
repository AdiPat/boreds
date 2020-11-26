import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import StarIcon from "@material-ui/icons/Star";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { DashPane } from "./DashPane";
import AppContext from "../providers/AppContext";
import { getStarredBoards, getRecentBoards } from "../services/board";

const useStyles = makeStyles((theme) => ({
  dashItem: {
    display: "flex",
    alignItems: "center",
  },
  dashItemIcon: {
    color: "#616161",
  },
  dashItemTitle: {
    marginLeft: theme.spacing(1),
    color: "#616161",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(8),
    paddingRight: 0,
  },
}));

function DashContent(props) {
  const classes = useStyles();
  const { state } = useContext(AppContext);
  const userId = props.userId;
  const boardsList = state.boardsList;
  const starredBoards = getStarredBoards(boardsList);
  const recentBoards = getRecentBoards(boardsList);

  return (
    <main className={classes.content}>
      <DashPane
        paneTitle="Starred Boards"
        icon={<StarIcon />}
        paneBoards={starredBoards}
      />
      <DashPane
        paneTitle="Recent Boards"
        icon={<ScheduleIcon />}
        paneBoards={recentBoards}
      />
      <DashPane
        paneTitle="All Boards"
        icon={<LibraryBooksIcon />}
        paneBoards={boardsList}
        showNoBoards={true}
      />
    </main>
  );
}

DashContent.propTypes = {
  userId: PropTypes.string.isRequired,
};

export { DashContent };
