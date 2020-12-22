import { useEffect } from "react";
import firebase from "firebase/app";
import { Routes } from "./Routes";
import AppProvider from "./providers/AppProvider";
import {
  firebaseApp,
  initializeAuthEmulator,
  initializeFunctionsEmulator,
  initializeFirestoreEmulator,
} from "./firebase/firebase";
import "./App.css";

function App() {
  useEffect(() => {
    initializeAuthEmulator();
    initializeFunctionsEmulator();
    initializeFirestoreEmulator();
  });

  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}

export default App;
