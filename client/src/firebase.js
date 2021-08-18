import fb from "firebase/app";
import fb_config from "./firebase-config.json"

const firebase = !fb.apps.length
  ? fb.initializeApp(fb_config)
  : fb.app();

export default firebase;
