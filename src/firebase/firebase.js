import firebase from "firebase/app";
import "firebase/analytics";
import { productionConfig, developmentConfig } from "../config";

let config = developmentConfig;

if (process.env.NODE_ENV == "development") {
  config = developmentConfig;
} else if (process.env.NODE_ENV == "production") {
  config = productionConfig;
}

export const initializeAuthEmulator = () => {
  if (process.env.REACT_APP_USE_AUTH_EMULATOR == "true") {
    firebase.auth().useEmulator(process.env.REACT_APP_AUTH_EMULATOR_URL);
  }
};

export const firebaseApp = firebase.initializeApp(config);
