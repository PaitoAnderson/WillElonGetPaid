require('./style.css');

/*import * as firebase from 'firebase'
// Required for side-effects
require("firebase/firestore");

firebase.initializeApp({
    apiKey: 'AIzaSyBiZYCgi9u5Z4n0132SFhq9sTulPYi2io0',
    authDomain: 'will-elon-get-paid.firebaseapp.com',
    projectId: 'will-elon-get-paid'
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

db.collection("votes").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
});*/

var voteNoElement = document.getElementById('option-1');
var voteYesElement = document.getElementById('option-2');

voteNoElement.onclick = voteNo;
voteYesElement.onclick = voteYes;

function voteNo() {
    removeByClassName('segmented-control-input');

    console.log('Votes No!');
}

function voteYes() {
    removeByClassName('segmented-control-input');

    console.log('Voted Yes!');
}

function removeByClassName(className) {
    var x = document.getElementsByClassName(className);
    var i;
    for (i = x.length - 1; i >= 0; i--){
        x[i].parentNode.removeChild(x[i]);
    }
}
