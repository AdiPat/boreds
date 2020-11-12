import { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { red, purple, blue, green, yellow } from "@material-ui/core/colors";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import { starBoard, unstarBoard } from "../services/board";
import AppContext from "../providers/AppContext";

const useStyles = makeStyles((theme) => ({
  listGridItem: {
    marginTop: theme.spacing(2),
  },

  avatarGreen: {
    backgroundColor: green[500],
  },

  avatarRed: {
    backgroundColor: red[500],
  },

  avatarPurple: {
    backgroundColor: purple[500],
  },

  avatarBlue: {
    backgroundColor: blue[500],
  },

  boardListCard: {
    marginRight: theme.spacing(1),
  },

  boardListCardHeader: {
    textTransform: "uppercase",
  },

  starIcon: {
    color: yellow[700],
  },
}));

function BoardListItem(props) {
  const { state } = useContext(AppContext);
  const classes = useStyles();
  const userId = state.user.uid;

  const handleStarFlip = () => {
    if (props.isStarred) {
      unstarBoard(userId, props.boardId);
    } else {
      starBoard(userId, props.boardId);
    }
  };

  const getAvatarClass = () => {
    const avatarClasses = [
      classes.avatarRed,
      classes.avatarBlue,
      classes.avatarPurple,
      classes.avatarGreen,
    ];
    var index = Math.floor(Math.random() * avatarClasses.length);
    return avatarClasses[index];
  };

  const trimString = (s, maxLength) =>
    s.length > maxLength ? s.slice(0, maxLength - 1) + "..." : s;

  return (
    <Grid item xs={12} sm={4} md={3} className={classes.listGridItem}>
      <Card variant="outlined" className={classes.boardListCard}>
        <CardHeader
          avatar={
            <Avatar className={getAvatarClass()}>{props.title[0]}</Avatar>
          }
          title={trimString(props.title, 20)}
          className={classes.boardListCardHeader}
        ></CardHeader>
        <CardActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={props.clickHandler}
          >
            Open
          </Button>
          <IconButton onClick={handleStarFlip}>
            {props.isStarred ? (
              <StarIcon className={classes.starIcon} />
            ) : (
              <StarBorderIcon />
            )}
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}

export { BoardListItem };
