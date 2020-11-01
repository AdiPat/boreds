import React from "react";

class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Login Page</h1>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
      </div>
    );
  }
}

export { LoginPage };
