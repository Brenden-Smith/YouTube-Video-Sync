import { initializeApp, cert, ServiceAccount, getApps } from "firebase-admin/app";

getApps().length === 0 && initializeApp({
  credential: cert({
    type: "service_account",
    project_id: "video-sync-9901a",
    private_key_id: "ba7ba77dec19d853525ab8220ca95f831a772958",
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/@/g, "\n"),
    client_email:
      "firebase-adminsdk-4bues@video-sync-9901a.iam.gserviceaccount.com",
    client_id: "116787407081127898636",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4bues%40video-sync-9901a.iam.gserviceaccount.com",
  } as ServiceAccount),
  databaseURL: "https://video-sync-9901a-default-rtdb.firebaseio.com",
});
