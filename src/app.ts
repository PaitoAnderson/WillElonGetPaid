require('./style.css');

import * as firebase from 'firebase';
// Required for side-effects
require("firebase/firestore");

firebase.initializeApp({
    apiKey: 'AIzaSyBiZYCgi9u5Z4n0132SFhq9sTulPYi2io0',
    authDomain: 'will-elon-get-paid.firebaseapp.com',
    projectId: 'will-elon-get-paid'
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Get Vote Counts
/*db.collection("votes").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.id, doc.data());
    });
});*/

var voteNoElement = document.getElementById('option-1');
var voteYesElement = document.getElementById('option-2');

voteNoElement.onclick = voteNo;
voteYesElement.onclick = voteYes;

function voteNo() {
    vote(false);
}

function voteYes() {
   vote(true);
}

function vote(value: boolean) {
    removeByClassName('segmented-control-input');

    // Set Vote
    db.collection("votes").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        useragent: navigator.userAgent,
        value,
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

function removeByClassName(className: string) {
    var x = document.getElementsByClassName(className);
    var i;
    for (i = x.length - 1; i >= 0; i--){
        x[i].parentNode.removeChild(x[i]);
    }
}
