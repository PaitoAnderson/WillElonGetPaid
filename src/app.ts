require('./style.css');

import * as firebase from 'firebase/app';
// Required for side-effects
require("firebase/firestore");

firebase.initializeApp({
    apiKey: 'AIzaSyBiZYCgi9u5Z4n0132SFhq9sTulPYi2io0',
    authDomain: 'will-elon-get-paid.firebaseapp.com',
    projectId: 'will-elon-get-paid'
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Voting Callbacks
var voteYesElement = document.getElementById('option-1');
var voteNoElement = document.getElementById('option-2');
voteYesElement.onclick = () => vote(true);
voteNoElement.onclick = () => vote(false);

function vote(value: boolean) {

    // Prevent further voting
    disableInputs();

    // Set Vote
    db.collection("votes").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        useragent: navigator.userAgent,
        value,
    })
    .then(function(docRef) {
        // Get Vote Counts
        db.doc('votes/totals').get().then((totals) => {

            const data = totals.data();
            const percent = Math.abs(data.numVotesYes / data.numVotes) * 100;

            const displayedPercentage = Math.min(Math.max(30, percent), 70);
            (document.querySelector('.segmented-control-item.left') as HTMLDivElement).style.width = `${displayedPercentage}%`;

            var voteOptions = document.getElementsByClassName('segmented-control-label') as HTMLCollectionOf<HTMLLabelElement>;
            voteOptions[0].innerHTML = `I think so<br />${Math.round(percent)}%`;
            voteOptions[1].innerHTML = `I doubt it<br />${Math.round(Math.abs(percent - 100))}%`;

            var segmentedControl = document.querySelector('.segmented-control') as HTMLDivElement;
            segmentedControl.className = 'segmented-control-results';
        });
    })
    .catch(function(error) {
        enableInputs();

        console.error("Error adding document: ", error);
    });
}

function disableInputs() {
    (document.getElementById("option-1") as HTMLInputElement).disabled = true;
    (document.getElementById("option-2") as HTMLInputElement).disabled = true;
}

function enableInputs() {
    (document.getElementById("option-1") as HTMLInputElement).disabled = false;
    (document.getElementById("option-2") as HTMLInputElement).disabled = false;
}
