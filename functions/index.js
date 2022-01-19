/* eslint-disable linebreak-style */
/* eslint-disable max-len */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {google} = require("googleapis");
const service = google.youtube("v3");

admin.initializeApp();

/**
 * Adds a user to the room
 */
exports.addUser = functions.https.onCall(async (data, context) => {
  console.log(data);
  return await admin
      .database()
      .ref(`rooms/${data.room}/users/${data.uid}`)
      .set({
        displayName: data.displayName,
        photoURL: data.photoURL,
        uid: data.uid,
      })
      .then(async () => {
        await admin
            .database()
            .ref(`rooms/${data.room}/users`)
            .get().then(async (snapshot) => {
              if (snapshot.numChildren() === 1) {
                await admin.database()
                    .ref(`rooms/${data.room}/host`).set(data.uid);
              }
            });
        return 201;
      })
      .catch((error) => {
        console.log(error);
        return 500;
      });
});

/**
 * Removes a user from the room
 */
exports.removeUser = functions.https.onCall(async (data, context) => {
  console.log(data);
  return await admin
      .database()
      .ref(`rooms/${data.room}/users/${data.uid}`)
      .remove()
      .then(async () => {
        // Remove the room if there are no users
        await admin
            .database()
            .ref(`rooms/${data.room}/users`)
            .get().then(async (doc) => {
              if (doc.val() === null) {
                await admin.database().ref(`rooms/${data.room}`).remove();
              }
            });
        return 201;
      })
      .catch((error) => {
        console.log(error);
        return 500;
      });
});

/**
 * Fetch a video from the YouTube API based on search query
 */
exports.fetchVideo = functions.https.onCall(async (data, context) => {
  return await service.videos.list({
    auth: process.env.FIREBASE_API_KEY,
    part: "snippet",
    id: data.query,
  }).then((response) => {
    if (response) {
      return response.data.items[0];
    } else {
      return 500;
    }
  }).catch((error) => {
    console.log(error);
    return 500;
  });
});

/**
 * Fetch creator photo from the YouTube API based on search query
 */
exports.fetchChannelThumbnail = functions.https.onCall(async (data, context) => {
  return await service.channels.list({
    auth: process.env.FIREBASE_API_KEY,
    part: "snippet",
    id: data.query,
  }).then((response) => {
    if (response) {
      return response.data.items[0];
    } else {
      return 500;
    }
  }).catch((error) => {
    console.log(error);
    return 500;
  });
});
