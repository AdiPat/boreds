import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, ListItem, ListItemText, Button } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const useStyles = makeStyles((theme) => ({
  emptyListItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    margin: 0,
    padding: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
}));

function EventListAddButton() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <ListItem key={1} className={classes.emptyListItem} disableTouchRipple>
        <ListItemText
          disableTypography
          primary={<Typography variant="body1">No events.</Typography>}
        />
        <Button
          size="small"
          variant="contained"
          color="secondary"
          endIcon={<AddCircleOutlineIcon />}
        >
          Add Event
        </Button>
      </ListItem>
    </React.Fragment>
  );
}

export { EventListAddButton };
