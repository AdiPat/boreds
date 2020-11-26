import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const updateUserOnSignup = (userId, userObj) => {
  if (userObj !== null) {
    const userData = {
      userId: userObj.uid,
      displayName: userObj.displayName,
      email: userObj.email,
      boards: [],
    };

    firebase
      .database()
      .ref(`users/${userId}`)
      .set(userData)
      .then(() => {
        console.log("Updated user.");
      })
      .catch((err) => {
        console.log("Failed to update user. ", err);
      });
  }
};

const updateUserIfNotFound = (user) => {
  firebase
    .database()
    .ref(`users/${user.uid}`)
    .once("value")
    .then((snapshot) => {
      console.log("Login: Snapshot - ", snapshot.val());
      if (snapshot.val() === null) {
        console.log("There is no data for this user. Addding.");
        updateUserOnSignup(user.uid, user);
      }
    });
};

const getCurrentUser = () => {
  return firebase.auth().currentUser;
};

const getCurrentUserDisplayName = async () => {
  const user = getCurrentUser();
  const userId = user.uid;
  const userRef = firebase.database().ref(`/users/${userId}/displayName`);
  let displayName = "";
  await userRef.once("value").then((snapshot) => {
    displayName = snapshot.val();
  });
  return displayName;
};

const updateDisplayName = async (userId, newDisplayName) => {
  const userRef = firebase.database().ref(`/users/${userId}/displayName`);
  let status = false;
  await userRef
    .set(newDisplayName)
    .then(() => {
      console.log("Updated display name.");
      status = true;
    })
    .catch((err) => {
      console.error("Failed to update display name");
      status = false;
    });
  return status;
};

export {
  updateUserOnSignup,
  updateUserIfNotFound,
  getCurrentUser,
  getCurrentUserDisplayName,
  updateDisplayName,
};
