import { useState } from "react";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import firebase from "firebase/app";
import DashDrawer from "./DashDrawer";

function Dashboard(props) {
  const history = useHistory();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleLogout = () => {
    firebase.auth().signOut();
    history.push("/login");
  };

  return (
    <div>
      <DashDrawer
        openDrawer={openDrawer}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      ></DashDrawer>
      <Container>
        <h1>Welcome {props.user.email}</h1>
        <Button type="contained" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Container>
    </div>
  );
}

export { Dashboard };
