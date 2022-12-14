const input = require("./input.js");

// my solution involves lots of iteration. I do this to make the code obvious, though it is by no means efficient

// split input text into array of rucksacks
const rucksackStrings = input.split("\n");

// map array into array of objects: { firstRucksack: "", secondRucksack: "", thirdRucksack: "" }
const rucksackGroups = [];
for (let i = 0; i < rucksackStrings.length; i += 3) {
    rucksackGroups.push({
        first: rucksackStrings[i],
        second: rucksackStrings[i + 1],
        third: rucksackStrings[i + 2]
    });
}

// identify badge of each group
rucksackGroups.forEach((rucksackGroup) => {
    for (let letter of rucksackGroup.first) {
        if (rucksackGroup.second.includes(letter)) {
            if (rucksackGroup.third.includes(letter)) {
                rucksackGroup.badge = letter;
                break;
            }
        }
    }
});

// create array of totals based on priority values for each group's badge
const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const priorityTotals = rucksackGroups.map((rucksackGroup) => {
    return letters.indexOf(rucksackGroup.badge) + 1;
});

const priorityTotal = priorityTotals.reduce((currentTotal, currentValue) => {
    return currentTotal + currentValue;
}, 0);

console.log(priorityTotal);
