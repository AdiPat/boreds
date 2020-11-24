import { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import AppContext from "../providers/AppContext";
import { CircularLoader } from "../components/CircularLoader";
import { DashDrawer } from "../components/DashDrawer";
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
      <DashDrawer userId={user.uid} />
      <ProfileContent />
    </div>
  ) : (
    <Redirect to="/login" />
  );
}

export default Profile;
