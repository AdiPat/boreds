import React from "react";
import CalendarContext from "./CalendarContext";

class CalendarProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      remount: false,
    };

    this.forceUpdate = this.forceUpdate.bind(this);
    this.setSelectedDate = this.setSelectedDate.bind(this);
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
          selectedDate: this.state.selectedDate,
          setSelectedDate: this.setSelectedDate,
        }}
      >
        {this.props.children}
      </CalendarContext.Provider>
    );
  }
}

export default CalendarProvider;
