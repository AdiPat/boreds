import React from "react";
import { TablesContext } from "./TablesContext";

class TablesProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedTable: null,
    };
  }

  render() {
    return (
      <TablesContext.Provider
        values={{
          selectedTable: this.state.selectedTable,
        }}
      >
        {this.props.children}
      </TablesContext.Provider>
    );
  }
}

export { TablesProvider };
