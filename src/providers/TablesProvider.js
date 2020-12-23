import React from "react";
import { TablesContext } from "./TablesContext";

class TablesProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedTable: null,
      curTable: {
        headers: [],
        data: [],
      },
    };

    this.setCurTable = this.setCurTable.bind(this);
  }

  setCurTable(headers, data) {
    this.setState({ curTable: { headers, data } });
  }

  render() {
    return (
      <TablesContext.Provider
        value={{
          selectedTable: this.state.selectedTable,
          curTable: this.state.curTable,
          setCurTable: this.setCurTable,
        }}
      >
        {this.props.children}
      </TablesContext.Provider>
    );
  }
}

export { TablesProvider };
