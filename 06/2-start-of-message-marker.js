const { input } = require("./input.js");

// need to find the no. of characters right up to the end of the first fourteen-character start-of-message marker

// map string into overlapping substrings
const groupsOfFourteen = [];
for (let i = 0; i < input.length; ++i) {
    let groupOfFourteen = "";
    for (let j = 0; j < 14; ++j) {
        groupOfFourteen += input[i + j];
    }
    groupsOfFourteen.push(groupOfFourteen);
}

function isUnique(string, value) {
    return string.indexOf(value) === string.lastIndexOf(value);
}

let startOfMessageIndex;
for (let i = 0; i < groupsOfFourteen.length; ++i) {
    let stateSetter = true;
    for (let j = 0; j < groupsOfFourteen[i].length; ++j) {
        if (!isUnique(groupsOfFourteen[i], groupsOfFourteen[i][j])) {
            stateSetter = false;
            break;
        }
    }
    if (stateSetter) {
        startOfMessageIndex = i;
        break;
    }
}

console.log(startOfMessageIndex + 14);
