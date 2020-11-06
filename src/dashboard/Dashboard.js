import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase/app";
import { boardsData } from "./boardsData";
import { DashDrawer } from "./DashDrawer";
import { DashContent } from "./DashContent";

function Dashboard(props) {
  const history = useHistory();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [boardsList, setBoardsList] = useState(boardsData);

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
        handleLogout={handleLogout}
        boardsList={boardsList}
        setBoardsList={setBoardsList}
      ></DashDrawer>
      <DashContent
        user={props.user}
        boardsList={props.boardsList}
      ></DashContent>
    </div>
  );
}

export { Dashboard };
