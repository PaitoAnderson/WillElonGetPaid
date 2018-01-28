import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

exports.tallyVotes = functions.firestore
    .document('votes/{document=**}')
    .onWrite((event) => {

        // Get value of the newly added vote
        const value = event.data.get('value');

        // Get a reference to the vote totals
        const totals = admin.firestore().collection('votes').doc("totals");

        return admin.firestore().runTransaction(transaction => {
            return transaction.get(totals).then(doc => {
                const data = doc.data();
                const numVotesYes = value ? data.numVotesYes + 1 : data.numVotesYes;
                const numVotes = data.numVotes + 1;
                transaction.update(totals, { numVotesYes, numVotes });
            });
        });
});