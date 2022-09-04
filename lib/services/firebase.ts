import { getApps, initializeApp } from "firebase/app";
import {
  getToken,
  initializeAppCheck,
  ReCaptchaV3Provider,
} from "firebase/app-check";

getApps().length === 0 && initializeApp({
  apiKey: "AIzaSyBJh_vBCy-Uw-87Wr8U_OJXsskwNkbLW7w",
  authDomain: "video-sync-9901a.firebaseapp.com",
  projectId: "video-sync-9901a",
  storageBucket: "video-sync-9901a.appspot.com",
  messagingSenderId: "230138385812",
  appId: "1:230138385812:web:1efac48907064740742b81",
  measurementId: "G-NGFVWWQ35Z",
});

// typeof window !== undefined && getToken(
//   initializeAppCheck(
//     initializeApp({
//       apiKey: "AIzaSyBJh_vBCy-Uw-87Wr8U_OJXsskwNkbLW7w",
//       authDomain: "video-sync-9901a.firebaseapp.com",
//       projectId: "video-sync-9901a",
//       storageBucket: "video-sync-9901a.appspot.com",
//       messagingSenderId: "230138385812",
//       appId: "1:230138385812:web:1efac48907064740742b81",
//       measurementId: "G-NGFVWWQ35Z",
//     }),
//     {
//       provider: new ReCaptchaV3Provider(
//         "6LeawxoeAAAAAASQoIUmXg4gkAMS1jJ9jKYBhp9E"
//       ),
//       isTokenAutoRefreshEnabled: true,
//     }
//   )
// )
//   .then(() => {
//     console.log("Firebase authenticated & initialized");
//   })
//   .catch((error) => {
//     console.log(error);
//   });

