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
const migrateBoards = async (userId, setMigratedFlag) => {
  const database = firebase.database();
  const userMigratedRef = database.ref(`users/${userId}/boardsMigrated`);
  let isMigrated = await isBoardsMigrated(userId);
  if (!isMigrated) {
    // get all boards
    const boardsRef = database.ref(`users/${userId}/boards`);
    const newBoardsRef = database.ref("boards");
    const boards = await (await boardsRef.once("value")).val();
    if (boards) {
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
          userMigratedRef.set(true);
          setMigratedFlag(true);
        })
        .catch((err) => {
          console.log("Failed to migrate boards. ", err);
          userMigratedRef.set(false);
          setMigratedFlag(false);
        });
    }
  }
};

export { isBoardsMigrated, migrateBoards };
