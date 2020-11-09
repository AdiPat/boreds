import React from "react";
import firebase from "firebase/app";
import "firebase/database";
import AppContext from "./AppContext";

class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      boardsList: {},
    };
    this.setBoardsList = this.setBoardsList.bind(this);
  }

  setBoardsList(newBoardsList) {
    if (newBoardsList) {
      this.setState({ boardsList: newBoardsList });
    }
  }

  componentDidMount() {
    const thisComponent = this;
    firebase.auth().onAuthStateChanged((userAuth) => {
      console.log("Auth state changed: ", userAuth);
      this.setState({ user: userAuth });

      const boardsRef = firebase.database().ref(`users/${userAuth.uid}/boards`);
      boardsRef.on("value", function (snapshot) {
        const newBoardsList = snapshot.val();
        thisComponent.setBoardsList(newBoardsList);
      });
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
