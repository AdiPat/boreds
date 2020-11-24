import { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import StarIcon from "@material-ui/icons/Star";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { DashPane } from "./DashPane";
import { DeleteBoardModal } from "../components/DeleteBoardModal";
import { NoBoardAction } from "./NoBoardAction";
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
  const userId = state.user.uid;
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteModalBoardTitle, setDeleteModalBoardTitle] = useState("");
  const [deleteBoardId, setDeleteBoardId] = useState(null);
  const boardsList = state.boardsList;
  const starredBoards = getStarredBoards(boardsList);
  const recentBoards = getRecentBoards(boardsList);

  const loadDeleteModal = (boardId) => {
    console.log("Deleting board: ", boardId);
    setOpenDeleteModal(true);
    setDeleteModalBoardTitle(boardsList[boardId].title);
    setDeleteBoardId(boardId);
  };

  return (
    <main className={classes.content}>
      {starredBoards && starredBoards.length ? (
        <DashPane
          paneTitle="Starred Boards"
          icon={<StarIcon />}
          paneBoards={starredBoards}
          loadDeleteModal={loadDeleteModal}
        />
      ) : null}
      {recentBoards && recentBoards.length ? (
        <DashPane
          paneTitle="Recent Boards"
          icon={<ScheduleIcon />}
          paneBoards={recentBoards}
          loadDeleteModal={loadDeleteModal}
        />
      ) : null}
      {Object.keys(boardsList).length ? (
        <DashPane
          paneTitle="All Boards"
          icon={<LibraryBooksIcon />}
          paneBoards={boardsList}
          loadDeleteModal={loadDeleteModal}
        />
      ) : (
        <NoBoardAction />
      )}
      <DeleteBoardModal
        handleOpenModal={() => setOpenDeleteModal(true)}
        handleCloseModal={() => setOpenDeleteModal(false)}
        openModal={openDeleteModal}
        boardTitle={deleteModalBoardTitle}
        userId={userId}
        boardId={deleteBoardId}
      />
    </main>
  );
}

export { DashContent };
