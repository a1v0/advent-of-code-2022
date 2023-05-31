const { input } = require("./input.js");

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

const startOfPacketIndex = getStartOfPacketIndex(groupsOfFour);

// log index of the first substring that passes the test, then return index + 4
console.log(startOfPacketIndex + 4);

function getStartOfPacketIndex(groupsOfFour) {
    for (let i = 0; i < groupsOfFour.length; ++i) {
        if (isNotUnique(groupsOfFour[i], 0)) continue;
        if (isNotUnique(groupsOfFour[i], 1)) continue;
        if (isNotUnique(groupsOfFour[i], 2)) continue;

        return i;
    }
}

function isNotUnique(groupOfFour, index) {
    return (
        groupOfFour.indexOf(groupOfFour[index]) !==
        groupOfFour.lastIndexOf(groupOfFour[index])
    );
}
