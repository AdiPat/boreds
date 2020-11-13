import firebase from "firebase/app";
import "firebase/database";

const isBoardsMigrated = async (userId) => {
  const database = firebase.database();
  const userMigratedRef = database.ref(`users/${userId}/boardsMigrated`);
  let isMigratedSnapshot = await userMigratedRef.once("value");
  const isMigrated = Boolean(isMigratedSnapshot.val());
  return isMigrated;
};

// migrates users/userId/boards to boards/
const migrateBoards = async (userId) => {
  const database = firebase.database();
  const userMigratedRef = database.ref(`users/${userId}/boardsMigrated`);
  let isMigrated = await isBoardsMigrated(userId);
  if (!isMigrated) {
    // get all boards
    const boardsRef = database.ref(`users/${userId}/boards`);
    const newBoardsRef = database.ref("boards");
    const boards = await (await boardsRef.once("value")).val();
    let updatedBoards = {};
    Object.keys(boards).forEach((boardKey) => {
      let updatedBoardItem = boards[boardKey];
      updatedBoardItem.owner = userId;
      updatedBoards[boardKey] = updatedBoardItem;
    });
    newBoardsRef
      .update(updatedBoards)
      .then(() => {
        console.log("Migrated boards to new location.");
        isMigrated = true;
        userMigratedRef.set(isMigrated);
      })
      .catch((err) => console.log("Failed to migrate boards. ", err));
  }
};

export { isBoardsMigrated, migrateBoards };
