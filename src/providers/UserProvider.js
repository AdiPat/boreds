import React from "react";
import firebase from "firebase/app";
import UserContext from "./UserContext";

class UserProvider extends React.Component {
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
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export { UserContext };
export default UserProvider;
