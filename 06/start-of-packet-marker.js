const { input } = require("./input.js");

// may God have mercy on the inefficiency of this...

// need to find the no. of characters right up to the end of the first four-character start-of-packet marker

// map string into overlapping substrings, i.e. "1234", "2345", "3456"
const groupsOfFour = [];
for (let i = 0; i < input.length; ++i) {
    let groupOfFour = "";
    groupOfFour += input[i];
    groupOfFour += input[i + 1];
    groupOfFour += input[i + 2];
    groupOfFour += input[i + 3];
    groupsOfFour.push(groupOfFour);
}

// loop through each substring, checking if indexOf of each letter === lastIndexOf of each letter

let startOfPacketIndex;
for (let i = 0; i < groupsOfFour.length; ++i) {
    if (
        groupsOfFour[i].indexOf(groupsOfFour[i][0]) ===
            groupsOfFour[i].lastIndexOf(groupsOfFour[i][0]) &&
        groupsOfFour[i].indexOf(groupsOfFour[i][1]) ===
            groupsOfFour[i].lastIndexOf(groupsOfFour[i][1]) &&
        groupsOfFour[i].indexOf(groupsOfFour[i][2]) ===
            groupsOfFour[i].lastIndexOf(groupsOfFour[i][2])
    ) {
        startOfPacketIndex = i;
        break;
    }
}

// log index of the first substring that passes the test, then return index + 4
console.log(startOfPacketIndex + 4);

module.exports = groupsOfFour;
