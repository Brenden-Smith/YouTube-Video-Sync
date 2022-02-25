/* eslint-disable no-restricted-globals */
import { getApp, initializeApp } from "firebase/app";
import {
  getToken,
  initializeAppCheck,
  ReCaptchaV3Provider,
} from "firebase/app-check";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectDatabaseEmulator, getDatabase } from "firebase/database";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { FirebaseConfig, RecaptchaConfig } from "./secret_keys";
 
// App initialization
const app = initializeApp(FirebaseConfig);
(window as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(RecaptchaConfig),
  isTokenAutoRefreshEnabled: true,
});

getToken(appCheck)
  .then(() => {
    console.log("Firebase authenticated & initialized");
  })
  .catch((error) => {
    console.log(error);
  });

// Global Auth
export const auth = getAuth();
if (location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099");
}

// Global Database
export const db = getDatabase();
if (location.hostname === "localhost") {
  connectDatabaseEmulator(db, "localhost", 9000);
}

// Global Functions
export const functions = getFunctions(getApp());
if (location.hostname === "localhost") {
  connectFunctionsEmulator(functions, "localhost", 5001);
}
