const fullRangePairs = require("./how-many-halves-fully-contain-other.js");

// map fullRangePairs, splitting each string by " "
const splitFullRangePairs = fullRangePairs.map((fullRangePair) => {
    return [
        fullRangePair[0].trim().split(" "),
        fullRangePair[1].trim().split(" ")
    ];
});

// check loop through [0] and see if [1] contains any of the elements
let overlapCounter = 0;

splitFullRangePairs.forEach((splitFullRangePair) => {
    for (let item of splitFullRangePair[0]) {
        if (splitFullRangePair[1].includes(item)) {
            ++overlapCounter;
            break;
        }
    }
});

console.log(overlapCounter);
