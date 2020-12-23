import { useHistory } from "react-router";
import { SideMenuButton } from "./SideMenuButton";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";

function CalendarButton({ openDrawer }) {
  const history = useHistory();

  const handleCalendarRedirect = () => {
    history.push("/calendar");
  };

  return (
    <SideMenuButton
      btnKey="Calendar"
      text="Calendar"
      icon={<EventAvailableIcon />}
      clickHandler={handleCalendarRedirect}
      openDrawer={openDrawer}
    />
  );
}

export { CalendarButton };
