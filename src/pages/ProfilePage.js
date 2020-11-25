import { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import AppContext from "../providers/AppContext";
import { CircularLoader } from "../components/CircularLoader";
import { AppDrawer } from "../components/drawer/AppDrawer";
import { ProfileContent } from "../profile/ProfileContent";

function Profile(props) {
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useContext(AppContext);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  });

  return isLoading ? (
    <CircularLoader color="secondary" />
  ) : user != null ? (
    <div>
      <AppDrawer dashTitle="Profile" userId={user.uid} />
      <ProfileContent />
    </div>
  ) : (
    <Redirect to="/login" />
  );
}

export default Profile;
