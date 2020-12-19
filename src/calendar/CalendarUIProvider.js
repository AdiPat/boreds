import React from "react";
import moment from "moment";
import { CONSTANTS } from "../utils/constants";
import { Snackbar } from "@material-ui/core";
import { CreateEventModal } from "../components/modals/CreateEventModal";
import { EditEventModal } from "../components/modals/EditEventModal";
import { CalendarEventPopover } from "./menus/EventPopover";
import { EventListPopover } from "./menus/EventListPopover";
import { CalendarUIContext } from "./CalendarUIContext";

class CalendarUIProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      snackbar: {
        open: false,
        message: "",
      },
      eventPopover: {
        anchorEl: null,
      },
      eventListPopover: {
        anchorEl: null,
        date: moment(),
      },
      editEventModal: {
        open: false,
      },
      createEventModal: {
        open: false,
        preset: moment(),
      },
      shared: {
        curEvent: {},
      },
    };

    // snackbar
    this.showSnackbar = this.showSnackbar.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
    // event popover
    this.showEventPopover = this.showEventPopover.bind(this);
    this.closeEventPopover = this.closeEventPopover.bind(this);
    // event list popover
    this.showEventListPopover = this.showEventListPopover.bind(this);
    this.closeEventListPopover = this.closeEventListPopover.bind(this);
    // edit event modal
    this.showEditEventModal = this.showEditEventModal.bind(this);
    this.closeEditEventModal = this.closeEditEventModal.bind(this);
    // create event modal
    this.showCreateEventModal = this.showCreateEventModal.bind(this);
    this.closeCreateEventModal = this.closeCreateEventModal.bind(this);
  }

  // snackbar
  showSnackbar(msg) {
    this.setState({ snackbar: { open: true, message: msg } });
  }

  closeSnackbar() {
    this.setState({ snackbar: { open: false, message: "" } });
  }

  // event popover
  showEventPopover(event, calendarEvent) {
    event.stopPropagation();
    this.setState({
      eventPopover: { anchorEl: event.currentTarget },
      shared: { curEvent: calendarEvent },
    });
  }

  closeEventPopover() {
    this.setState({ eventPopover: { anchorEl: null } });
  }

  // event list popover
  showEventListPopover(event, date) {
    event.stopPropagation();
    this.setState({
      eventListPopover: { date: date, anchorEl: event.currentTarget },
    });
  }

  closeEventListPopover() {
    this.setState((prevState) => ({
      eventListPopover: {
        anchorEl: null,
        date: prevState.eventListPopover.date,
      },
    }));
  }

  // edit event modal
  showEditEventModal() {
    this.setState({ editEventModal: { open: true } });
  }

  closeEditEventModal() {
    this.setState({ editEventModal: { open: false } });
  }

  // create event modal
  showCreateEventModal(preset) {
    this.setState({ createEventModal: { open: true, preset: preset } });
  }

  closeCreateEventModal() {
    this.setState((prevState) => ({
      createEventModal: {
        open: false,
        preset: prevState.createEventModal.preset,
      },
    }));
  }

  render() {
    return (
      <CalendarUIContext.Provider
        value={{
          calendarSnackbar: {
            show: this.showSnackbar,
            close: this.closeSnackbar,
            isOpen: this.state.snackbar.open,
            message: this.state.snackbar.message,
          },
          eventPopover: {
            show: this.showEventPopover,
            close: this.closeEventPopover,
          },
          eventListPopover: {
            show: this.showEventListPopover,
            close: this.closeEventListPopover,
          },
          editEventModal: {
            show: this.showEditEventModal,
            close: this.closeEditEventModal,
          },
          createEventModal: {
            show: this.showCreateEventModal,
            close: this.closeCreateEventModal,
          },
        }}
      >
        {this.props.children}
        <Snackbar
          anchorOrigin={CONSTANTS.POPOVER.ALIGN_BOTTOM_CENTER.anchorOrigin}
          open={this.state.snackbar.open}
          onClose={this.closeSnackbar}
          autoHideDuration={CONSTANTS.SNACKBAR.defaultDuration}
          message={this.state.snackbar.message}
        />
        <CreateEventModal
          open={this.state.createEventModal.open}
          handleCloseModal={this.closeCreateEventModal}
          datePreset={this.state.createEventModal.preset}
          timePreset={this.state.createEventModal.preset}
        />
        <EditEventModal
          open={this.state.editEventModal.open}
          handleCloseModal={this.closeEditEventModal}
          curEvent={this.state.shared.curEvent}
          openEventPopover={this.showEventPopover}
        />
        <CalendarEventPopover
          anchorEl={this.state.eventPopover.anchorEl}
          handleClose={this.closeEventPopover}
          event={this.state.shared.curEvent}
          openEditEventModal={this.showEditEventModal}
        />
        <EventListPopover
          anchorEl={this.state.eventListPopover.anchorEl}
          handleClose={this.closeEventListPopover}
          date={this.state.eventListPopover.date}
        />
      </CalendarUIContext.Provider>
    );
  }
}

export { CalendarUIProvider };
