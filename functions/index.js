/* eslint-disable linebreak-style */
const functions = require("firebase-functions");
const admin = require("firebase-admin");

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
