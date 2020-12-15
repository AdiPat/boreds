import { useEffect } from "react";
import firebase from "firebase/app";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { SignupPage } from "./pages/SignupPage";
import { DashPage } from "./pages/DashPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { BoardPage } from "./pages/BoardPage";
import { TasksPage } from "./pages/TasksPage";
import { CalendarPage } from "./pages/CalendarPage";
import AppProvider from "./providers/AppProvider";
import {
  firebaseApp,
  initializeAuthEmulator,
  initializeFunctionsEmulator,
  initializeFirestoreEmulator,
} from "./firebase/firebase";
import "./App.css";
import Profile from "./pages/ProfilePage";

function App() {
  useEffect(() => {
    initializeAuthEmulator();
    initializeFunctionsEmulator();
    initializeFirestoreEmulator();
  });

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
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/tasks">
            <TasksPage />
          </Route>
          <Route path="/tasks/:taskId" component={TasksPage} />
          <Route exact path="/calendar">
            <CalendarPage />
          </Route>
        </Switch>
      </Router>
    </AppProvider>
  );
}

export default App;
