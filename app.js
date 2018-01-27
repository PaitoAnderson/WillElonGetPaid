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
