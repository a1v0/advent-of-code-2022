const input = require("./input.js");

const pairStrings = input.split("\n");

const fullRangePairs = pairStrings.map((pairString) => {
    const hyphenatedPair = pairString.split(",");
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

module.exports = fullRangePairs;
