import { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import AppContext from "../providers/AppContext";
import { CircularLoader } from "../components/CircularLoader";
import { DashDrawer } from "../components/DashDrawer";
import { ProfileContent } from "../profile/ProfileContent";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    margin: theme.spacing(10),
    padding: theme.spacing(2),
  },
}));

function Profile(props) {
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useContext(AppContext);
  const classes = useStyles();

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  });

  return isLoading ? (
    <CircularLoader color="secondary" />
  ) : user != null ? (
    <div>
      <DashDrawer userId={user.uid} />
      <ProfileContent />
    </div>
  ) : (
    <Redirect to="/login" />
  );
}

export default Profile;
