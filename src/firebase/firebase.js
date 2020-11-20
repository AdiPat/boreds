import firebase from "firebase/app";
import "firebase/analytics";
import { productionConfig, developmentConfig } from "../config";

let config = developmentConfig;

if (process.env.NODE_ENV == "development") {
  config = developmentConfig;
} else if (process.env.NODE_ENV == "production") {
  config = productionConfig;
}

export const firebaseApp = firebase.initializeApp(config);
