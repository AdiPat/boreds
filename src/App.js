import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { LoginPage } from "./login/LoginPage";
import "./App.css";

function App() {
  return (
    <Router>
      <h1>Welcome to Boreds</h1>
      <Switch>
        <Route exact path="/login">
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
