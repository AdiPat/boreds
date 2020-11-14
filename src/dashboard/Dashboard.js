import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase/app";
import { DashDrawer } from "../components/DashDrawer";
import { DashContent } from "./DashContent";
import { getCurrentUser } from "../services/user";
import { getAllInvites } from "../services/invite";

function Dashboard(props) {
  const history = useHistory();

  const handleLogout = () => {
    firebase.auth().signOut();
    history.push("/login");
  };

  useEffect(() => {
    const userId = getCurrentUser().uid;
    // todo: pass to DashDrawer and show in notifications
    getAllInvites(userId)
      .then((invites) => {
        console.log("All invites: ", invites);
      })
      .catch((err) => {
        console.log("Couldn't get all invites.", err);
      });
  });

  return (
    <div>
      <DashDrawer dashTitle="Dashboard"></DashDrawer>
      <DashContent user={props.user}></DashContent>
    </div>
  );
}

export { Dashboard };
