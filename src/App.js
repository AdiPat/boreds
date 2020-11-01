import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { LoginPage } from "./pages/login/LoginPage";
import { HomePage } from "./pages/home/HomePage";
import { SignupPage } from "./pages/signup/SignupPage";
import { firebaseApp } from "./firebase/firebase";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/signup">
          <SignupPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
