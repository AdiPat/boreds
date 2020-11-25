import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { red, purple, blue, green } from "@material-ui/core/colors";
import { CardHeader, Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
}));

function BoardListItemHeader(props) {
  const classes = useStyles();

  const trimString = (s, maxLength) =>
    s.length > maxLength ? s.slice(0, maxLength - 1) + "..." : s;

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

  return (
    <CardHeader
      avatar={<Avatar className={getAvatarClass()}>{props.title[0]}</Avatar>}
      title={trimString(props.title, 20)}
      style={{
        textTransform: "uppercase",
      }}
    ></CardHeader>
  );
}

BoardListItemHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

BoardListItemHeader.defaultProps = {
  title: "",
};

export { BoardListItemHeader };
