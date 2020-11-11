import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { red, purple, blue, green } from "@material-ui/core/colors";
import { CardActions, CardHeader } from "@material-ui/core";

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
    fontSize: "100px",
  },
}));

function BoardListItem(props) {
  const classes = useStyles();

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
          <IconButton>
            <StarBorderIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}

export { BoardListItem };
