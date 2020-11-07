import React from "react";
import firebase from "firebase/app";
import AppContext from "./AppContext";

class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((userAuth) => {
      console.log("Auth state changed: ", userAuth);
      this.setState({ user: userAuth });
    });
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
