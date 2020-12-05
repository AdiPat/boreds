import { useState } from "react";
import PropTypes from "prop-types";
import { SideMenuButton } from "./SideMenuButton";
import TodayIcon from "@material-ui/icons/Today";

function AddEventButton(props) {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClick = () => {
    handleOpenModal();
    if (props.handleCloseMenu) {
      props.handleCloseMenu();
    }
  };

  return (
    <div>
      <SideMenuButton
        btnKey="CreateEvent"
        text="Create Event"
        icon={<TodayIcon />}
        clickHandler={handleClick}
      />
      {/* <CreateEventModal
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        openModal={openModal}
      ></CreateEventModal> */}
    </div>
  );
}

AddEventButton.propTypes = {
  handleCloseMenu: PropTypes.func,
};

AddEventButton.defaultProps = {
  handleCloseMenu: null,
};

export { AddEventButton };
