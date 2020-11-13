import React from "react";
import firebase from "firebase/app";
import "firebase/database";
import AppContext from "./AppContext";
import { getBoardIds } from "../services/board";
import { isBoardsMigrated, migrateBoards } from "../services/migrate";
import { attachBoardListener } from "../services/database";

class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      boardsList: {},
    };
    this.setBoardsList = this.setBoardsList.bind(this);
    this.setBoardsMigratedFlag = this.setBoardsMigratedFlag.bind(this);
    this.setBoardItem = this.setBoardItem.bind(this);
  }

  setBoardsList(newBoardsList) {
    if (newBoardsList) {
      this.setState({ boardsList: newBoardsList });
    }
  }

  setBoardsMigratedFlag(isMigrated) {
    this.setState({ migated: isMigrated });
  }

  setBoardItem(boardId, boardData) {
    if (boardId && boardData) {
      let updatedBoardList = {};
      Object.assign(updatedBoardList, this.state.boardsList);
      updatedBoardList[boardId] = boardData;
      this.setBoardsList(updatedBoardList);
    }
  }

  componentDidMount() {
    const thisComponent = this;
    firebase.auth().onAuthStateChanged(async (userAuth) => {
      console.log("Auth state changed: ", userAuth);
      this.setState({ user: userAuth });

      if (userAuth) {
        const userId = userAuth.uid;

        // migrate boards if the user is using the old format
        isBoardsMigrated(userId).then((boardMigrateFlag) => {
          if (!boardMigrateFlag) {
            migrateBoards(userId, thisComponent.setBoardsMigratedFlag);
          } else {
            thisComponent.setBoardsMigratedFlag(true);
          }
        });

        getBoardIds(userId).then((boardIds) =>
          boardIds.forEach((boardId) => {
            attachBoardListener(boardId, thisComponent.setBoardItem);
          })
        );
      }
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
