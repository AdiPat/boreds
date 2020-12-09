import PropTypes from "prop-types";
import { ListItemText } from "@material-ui/core";
import { StyledMenu } from "../../components/menus/StyledMenu";
import { StyledMenuItem } from "../../components/menus/StyledMenuItem";
import CONSTANTS from "../../utils/constants";

function TimeDurationMenu(props) {
  let renderMenu = () => {
    let menuJsx = [];
    const menuItems = props.timeOptions;
    const tasksLen = menuItems ? Object.keys(menuItems).length : 0;

    if (tasksLen) {
      menuJsx = Object.keys(menuItems).map((itemId) => {
        return (
          <StyledMenuItem
            key={itemId}
            onClick={() => {
              props.selectTime(itemId);
              props.handleClose();
            }}
          >
            <ListItemText style={{ fontSize: 10 }}>
              {menuItems[itemId]}
            </ListItemText>
          </StyledMenuItem>
        );
      });
    }

    return menuJsx;
  };

  return (
    <div>
      <StyledMenu
        id="customized-menu"
        anchorEl={props.anchorEl}
        keepMounted
        open={Boolean(props.anchorEl)}
        onClose={props.handleClose}
      >
        {renderMenu()}
      </StyledMenu>
    </div>
  );
}

TimeDurationMenu.propTypes = {
  anchorEl: PropTypes.node.isRequired,
  handleClose: PropTypes.func.isRequired,
  selectTime: PropTypes.func.isRequired,
  timeOptions: PropTypes.object.isRequired,
};

TimeDurationMenu.defaultProps = {
  anchorEl: null,
  handleClose: () => {},
  selectTime: () => {},
  timeOptions: CONSTANTS.CALENDAR.DURATIONS_TEXT,
};

export { TimeDurationMenu };
