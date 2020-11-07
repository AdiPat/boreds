import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { SignupPage } from "./pages/SignupPage";
import { DashPage } from "./pages/DashPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { BoardPage } from "./pages/BoardPage";
import AppProvider from "./providers/AppProvider";
import { firebaseApp } from "./firebase/firebase";
import "./App.css";

function App() {
  return (
    <AppProvider>
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
          <Route path="/board/:boardId" component={BoardPage} />
        </Switch>
      </Router>
    </AppProvider>
  );
}

export default App;
