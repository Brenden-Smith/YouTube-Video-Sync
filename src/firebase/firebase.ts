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

const app = initializeAppCheck(
  initializeApp({
    apiKey: "AIzaSyBJh_vBCy-Uw-87Wr8U_OJXsskwNkbLW7w",
    authDomain: "video-sync-9901a.firebaseapp.com",
    projectId: "video-sync-9901a",
    storageBucket: "video-sync-9901a.appspot.com",
    messagingSenderId: "230138385812",
    appId: "1:230138385812:web:1efac48907064740742b81",
    measurementId: "G-NGFVWWQ35Z",
  }),
  {
    provider: new ReCaptchaV3Provider("6LeawxoeAAAAAASQoIUmXg4gkAMS1jJ9jKYBhp9E"),
    isTokenAutoRefreshEnabled: true,
  }
);

getToken(app)
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
