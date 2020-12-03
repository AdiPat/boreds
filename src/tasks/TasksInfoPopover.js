import PropTypes from "prop-types";
import clsx from "clsx";
import { Popover, Grid, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { useState } from "react";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
  taskInfoIcon: {
    marginRight: theme.spacing(1),
    color: grey[600],
  },
  hide: {
    display: "none",
  },
}));

function TasksInfoPopover(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = (event) => {
    setAnchorEl(null);
  };

  return (
    <div
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
      className={clsx({ [classes.hide]: props.taskDescription == "" })}
    >
      <InfoIcon className={classes.taskInfoIcon} />
      <Popover
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography variant="body1">{props.taskDescription}</Typography>
      </Popover>
    </div>
  );
}

TasksInfoPopover.propTypes = {
  taskDescription: PropTypes.string.isRequired,
};

TasksInfoPopover.defaultProps = {
  taskDescription: "",
};

export { TasksInfoPopover };
