import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/functions";
import { productionConfig, developmentConfig } from "../config";

let config = developmentConfig;

if (process.env.NODE_ENV === "development") {
  config = developmentConfig;
} else if (process.env.NODE_ENV === "production") {
  config = productionConfig;
}

export const initializeAuthEmulator = () => {
  if (
    process.env.REACT_APP_USE_AUTH_EMULATOR === "true" &&
    process.env.NODE_ENV === "development"
  ) {
    firebase.auth().useEmulator(process.env.REACT_APP_AUTH_EMULATOR_URL);
  }
};

export const initializeFunctionsEmulator = () => {
  if (
    process.env.REACT_APP_USE_FUNCTIONS_EMULATOR === "true" &&
    process.env.NODE_ENV === "development"
  ) {
    console.log(
      "functions emulator: ",
      process.env.REACT_APP_FUNCTIONS_EMULATOR_PORT
    );
    firebase
      .functions()
      .useEmulator("localhost", process.env.REACT_APP_FUNCTIONS_EMULATOR_PORT);
  }
};

export const firebaseApp = firebase.initializeApp(config);
