import React from "react";
import firebase from "firebase/app";
import "firebase/database";
import AppContext from "./AppContext";
import {
  attachBoardAddedListener,
  attachBoardDeleteListener,
} from "../services/database";

class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      boardsList: {},
    };
    this.setBoardsList = this.setBoardsList.bind(this);
    this.setBoardsMigratedFlag = this.setBoardsMigratedFlag.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
    this.deleteBoard = this.deleteBoard.bind(this);
    this.addBoard = this.addBoard.bind(this);
  }

  setBoardsList(newBoardsList) {
    if (newBoardsList) {
      this.setState({ boardsList: newBoardsList });
    }
  }

  setBoardsMigratedFlag(isMigrated) {
    this.setState({ migrated: isMigrated });
  }

  updateBoard(boardId, boardData) {
    if (boardId && boardData) {
      this.setState((prevState) => {
        let updatedState = Object.assign({}, prevState);
        let updatedBoard = updatedState.boardsList[boardId];
        if (!updatedBoard) {
          updatedBoard = {};
        }
        updatedState.boardsList[boardId] = Object.assign(
          updatedBoard,
          boardData
        );
        return updatedState;
      });
    }
  }

  addBoard(boardId, boardData) {
    this.setState((prevState) => {
      let updatedState = Object.assign({}, prevState);
      updatedState.boardsList[boardId] = boardData;
      return updatedState;
    });
  }

  deleteBoard(boardId) {
    this.setState((prevState) => {
      let updatedState = Object.assign({}, prevState);
      delete updatedState.boardsList[boardId];
      return updatedState;
    });
  }

  componentDidMount() {
    const thisComponent = this;
    firebase.auth().onAuthStateChanged(async (userAuth) => {
      console.log("Auth state changed: ", userAuth);
      this.setState({ user: userAuth });

      if (userAuth) {
        const userId = userAuth.uid;

        attachBoardAddedListener(userId, thisComponent.updateBoard);
        attachBoardDeleteListener(userId, thisComponent.deleteBoard);
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
