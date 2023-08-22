const fullRangePairs = require("./how-many-halves-fully-contain-other.js");

const splitFullRangePairs = fullRangePairs.map((fullRangePair) => {
    return [
        fullRangePair[0].trim().split(" "),
        fullRangePair[1].trim().split(" ")
    ];
});

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
