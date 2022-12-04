const input = require("./input.js");

// split into pairs
const pairStrings = input.split("\n");

// split each pair into nested array with two strings
const hyphenatedPairs = pairStrings.map((pairString) => {
    return pairString.split(",");
});

// map each item into a string of the full range, e.g. 1-4 => 1234
const fullRangePairs = hyphenatedPairs.map((hyphenatedPair) => {
    const firstPair = hyphenatedPair[0].split("-");
    let firstRange = " ";
    for (let i = Number(firstPair[0]); i <= Number(firstPair[1]); ++i) {
        firstRange += String(i) + " ";
    }

    const secondPair = hyphenatedPair[1].split("-");
    let secondRange = " ";
    for (let i = Number(secondPair[0]); i <= Number(secondPair[1]); ++i) {
        secondRange += String(i) + " ";
    }
    return [firstRange, secondRange];
});

// count how often one string is included in other
let inclusionCounter = 0;
fullRangePairs.forEach((fullRangePair) => {
    if (
        fullRangePair[0].includes(fullRangePair[1]) ||
        fullRangePair[1].includes(fullRangePair[0])
    ) {
        ++inclusionCounter;
    }
});

console.log(inclusionCounter);
