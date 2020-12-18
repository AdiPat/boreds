import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { ListItem, ListItemText, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  eventListItem: {
    margin: 0,
    padding: 0,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  eventListItemText: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    fontSize: 12,
    fontWeight: "bold",
  },
}));

function ListMoreEventsButton({ extraEventsCount, key }) {
  const classes = useStyles();

  return (
    <ListItem key={key} button className={classes.eventListItem}>
      <ListItemText
        disableTypography
        primary={
          <Typography variant="subtitle2" className={classes.eventListItemText}>
            {extraEventsCount} more
          </Typography>
        }
      />
    </ListItem>
  );
}

ListMoreEventsButton.propTypes = {
  extraEventsCount: PropTypes.number.isRequired,
  key: PropTypes.number.isRequired,
};

export { ListMoreEventsButton };
