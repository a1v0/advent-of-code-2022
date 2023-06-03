const input = require("./input.js");

const rucksackStrings = input.split("\n");

const rucksackGroups = [];
for (let i = 0; i < rucksackStrings.length; i += 3) {
    rucksackGroups.push({
        first: rucksackStrings[i],
        second: rucksackStrings[i + 1],
        third: rucksackStrings[i + 2]
    });
}

rucksackGroups.forEach((rucksackGroup) => {
    for (let letter of rucksackGroup.first) {
        if (!rucksackGroup.second.includes(letter)) continue;
        if (!rucksackGroup.third.includes(letter)) continue;

        rucksackGroup.badge = letter;
        break;
    }
});

const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const priorityTotals = rucksackGroups.map((rucksackGroup) => {
    return letters.indexOf(rucksackGroup.badge) + 1;
});

const priorityTotal = priorityTotals.reduce((currentTotal, currentValue) => {
    return currentTotal + currentValue;
}, 0);

console.log(priorityTotal);
