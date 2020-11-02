import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { SignupPage } from "./pages/SignupPage";
import { DashPage } from "./pages/DashPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import UserProvider from "./providers/UserProvider";
import { firebaseApp } from "./firebase/firebase";
import "./App.css";

function App() {
  return (
    <UserProvider>
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
          <Route exact path="/forgot">
            <ForgotPasswordPage />
          </Route>
          <Route exact path="/dashboard">
            <DashPage />
          </Route>
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
