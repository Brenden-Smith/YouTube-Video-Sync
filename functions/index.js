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
      .then(() => {
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
  return await admin
      .database()
      .ref(`rooms/${data.room}/users/${data.uid}`)
      .remove()
      .then(() => {
        return 201;
      })
      .catch((error) => {
        console.log(error);
        return 500;
      });
});
