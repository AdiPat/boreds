import PropTypes from "prop-types";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { Popover, Divider, Typography } from "@material-ui/core";
import { getPopoverAlignment } from "../../utils/utils";
import { EventList } from "../misc/EventList";

const useStyles = makeStyles((theme) => ({
  popoverContainer: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    minWidth: theme.spacing(70),
    width: theme.spacing(70),
  },
  popoverHeader: {
    display: "flex",
    padding: theme.spacing(2),
    flexDirection: "column",
    justifyContent: "space-between",
  },
  popoverBody: {
    display: "flex",
  },
}));

function EventListPopover({ anchorEl, handleClose, date }) {
  const classes = useStyles();
  let popoverAlignment = getPopoverAlignment(anchorEl);

  return (
    <div>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={popoverAlignment.anchorOrigin}
        transformOrigin={popoverAlignment.transformOrigin}
      >
        <div className={classes.popoverContainer}>
          <div className={classes.popoverHeader}>
            <Typography variant="body1">
              Events on {date.format("dddd, Do MMMM, YYYY")}
            </Typography>
          </div>
          <Divider />
          <EventList date={date} shouldLimit={false} wrapText={false} />
        </div>
      </Popover>
    </div>
  );
}

EventListPopover.propTypes = {
  date: PropTypes.instanceOf(moment).isRequired,
  anchorEl: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

EventListPopover.defaultProps = {
  anchorEl: null,
  onClose: () => {},
};

export { EventListPopover };
