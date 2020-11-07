import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase/app";
import { DashDrawer } from "./DashDrawer";
import { DashContent } from "./DashContent";

function Dashboard(props) {
  const history = useHistory();

  const handleLogout = () => {
    firebase.auth().signOut();
    history.push("/login");
  };

  return (
    <div>
      <DashDrawer></DashDrawer>
      <DashContent user={props.user}></DashContent>
    </div>
  );
}

export { Dashboard };
