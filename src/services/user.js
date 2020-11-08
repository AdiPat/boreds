import firebase from "firebase/app";
import "firebase/database";

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

export { updateUserOnSignup, updateUserIfNotFound };
