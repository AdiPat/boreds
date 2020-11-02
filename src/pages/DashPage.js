import { useContext, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import UserContext from "../providers/UserContext";
import firebase from "firebase/app";

function DashPage() {
  const user = useContext(UserContext);
  const history = useHistory();

  return user ? (
    <Container>
      <h1>Welcome {user.email}</h1>
      <Button
        type="contained"
        color="primary"
        onClick={() => {
          firebase.auth().signOut();
          history.push("/login");
        }}
      >
        Logout
      </Button>
    </Container>
  ) : (
    <Redirect to="/login" />
  );
}

export { DashPage };
