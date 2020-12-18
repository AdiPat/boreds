import React from "react";
import CONSTANTS from "../utils/constants";
import { Snackbar } from "@material-ui/core";
import { CalendarUIContext } from "./CalendarUIContext";

class CalendarUIProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      snackbar: {
        open: false,
        message: "",
      },
    };

    this.showSnackbar = this.showSnackbar.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  showSnackbar(msg) {
    this.setState({ snackbar: { open: true, message: msg } });
  }

  closeSnackbar() {
    this.setState({ snackbar: { open: false, message: "" } });
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
      </CalendarUIContext.Provider>
    );
  }
}

export { CalendarUIProvider };
