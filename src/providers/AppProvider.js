import React from "react";
import firebase from "firebase/app";
import AppContext from "./AppContext";
import { boardsData } from "../dashboard/boardsData";

class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      boardsList: boardsData,
    };
    this.setBoardsList = this.setBoardsList.bind(this);
  }

  setBoardsList(newBoardsList) {
    this.setState({ boardsList: newBoardsList });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((userAuth) => {
      console.log("Auth state changed: ", userAuth);
      this.setState({ user: userAuth });
    });
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          state: this.state,
          user: this.state.user,
          setBoardsList: this.setBoardsList,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
