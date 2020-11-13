import React from "react";
import firebase from "firebase/app";
import "firebase/database";
import AppContext from "./AppContext";
import { isBoardsMigrated, migrateBoards } from "../services/migrate";

class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      boardsList: {},
    };
    this.setBoardsList = this.setBoardsList.bind(this);
    this.setBoardsMigratedFlag = this.setBoardsMigratedFlag(this);
  }

  setBoardsList(newBoardsList) {
    if (newBoardsList) {
      this.setState({ boardsList: newBoardsList });
    }
  }

  setBoardsMigratedFlag(isMigrated) {
    this.setState({ migated: isMigrated });
  }

  componentDidMount() {
    const thisComponent = this;
    firebase.auth().onAuthStateChanged(async (userAuth) => {
      console.log("Auth state changed: ", userAuth);
      this.setState({ user: userAuth });
      const userId = userAuth.uid;

      // migrate boards if the user is using the old format
      const boardMigrateFlag = await isBoardsMigrated(userId);
      if (!boardMigrateFlag) {
        migrateBoards(userId, this.setBoardsMigratedFlag);
      } else {
        this.setBoardsMigratedFlag(true);
      }

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
