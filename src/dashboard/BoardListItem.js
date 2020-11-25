import { useContext } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import { BoardListItemHeader } from "./BoardListItemHeader";
import { OpenBoardButton } from "./buttons/OpenBoardButton";
import { StarButton } from "./buttons/StarButton";
import { DeleteBoardButton } from "./buttons/DeleteBoardButton";
import AppContext from "../providers/AppContext";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  listGridItem: {
    marginTop: theme.spacing(2),
  },

  boardListCard: {
    marginRight: theme.spacing(1),
  },
}));

function BoardListItem(props) {
  const { state } = useContext(AppContext);
  const classes = useStyles();
  const userId = state.user.uid;

  return (
    <Grid item xs={12} sm={4} md={3} className={classes.listGridItem}>
      <Card elevation={3} className={classes.boardListCard}>
        <BoardListItemHeader title={props.title} />
        <Divider />
        <CardActions>
          <OpenBoardButton boardId={props.boardId} />
          <StarButton />
          <DeleteBoardButton
            userId={userId}
            boardId={props.boardId}
            boardTitle={props.boardTitle}
          />
        </CardActions>
      </Card>
    </Grid>
  );
}

BoardListItem.propTypes = {
  isStarred: PropTypes.bool.isRequired,
  boardId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  loadDeleteModal: PropTypes.func.isRequired,
};

export { BoardListItem };
