import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { SignupPage } from "./pages/SignupPage";
import { DashPage } from "./pages/DashPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { BoardPage } from "./pages/BoardPage";
import { TasksPage } from "./pages/TasksPage";
import { CalendarPage } from "./pages/CalendarPage";
import { ProfilePage } from "./pages/ProfilePage";

function Routes() {
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
        <Route exact path="/forgot">
          <ForgotPasswordPage />
        </Route>
        <Route exact path="/dashboard">
          <DashPage />
        </Route>
        <Route path="/board/:boardId" component={BoardPage} />
        <Route exact path="/profile">
          <ProfilePage />
        </Route>
        <Route exact path="/tasks">
          <TasksPage />
        </Route>
        <Route path="/tasks/:taskId" component={TasksPage} />
        <Route path="/calendar" component={CalendarPage} />
      </Switch>
    </Router>
  );
}

export { Routes };
