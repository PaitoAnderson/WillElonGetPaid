"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
admin.initializeApp(functions.config().firebase);
exports.tallyVotes = functions.firestore
    .document('votes/{document=**}')
    .onWrite((event) => {
    // Get value of the newly added vote
    const voteData = event.data.data();
    // Check if vote
    if (!voteData.timestamp) {
        return undefined;
    }
    // Get a reference to the vote totals
    const totals = admin.firestore().collection('votes').doc("totals");
    return admin.firestore().runTransaction(transaction => {
        return transaction.get(totals).then(doc => {
            const data = doc.data();
            const numVotesYes = voteData.value ? data.numVotesYes + 1 : data.numVotesYes;
            const numVotes = data.numVotes + 1;
            transaction.update(totals, { numVotesYes, numVotes });
        });
    });
});
//# sourceMappingURL=index.js.map