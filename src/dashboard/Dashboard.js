import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase/app";
import { boardsData } from "./boardsData";
import { DashDrawer } from "./DashDrawer";
import { DashContent } from "./DashContent";

function Dashboard(props) {
  const history = useHistory();
  const [boardsList, setBoardsList] = useState(boardsData);

  const handleLogout = () => {
    firebase.auth().signOut();
    history.push("/login");
  };

  return (
    <div>
      <DashDrawer
        boardsList={boardsList}
        setBoardsList={setBoardsList}
      ></DashDrawer>
      <DashContent user={props.user} boardsList={boardsList}></DashContent>
    </div>
  );
}

export { Dashboard };
