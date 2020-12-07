import React from "react";
import CalendarContext from "./CalendarContext";

class CalendarProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      remount: false,
    };
  }

  forceProviderUpdate() {
    this.setState({ remount: !this.state.remount });
  }

  setSelectedDate(date) {
    this.setState({ selectedDate: date });
  }

  //   componentDidMount() {

  //   }

  render() {
    return (
      <CalendarContext.Provider
        value={{
          state: this.state,
        }}
      >
        {this.props.children}
      </CalendarContext.Provider>
    );
  }
}

export default CalendarProvider;
