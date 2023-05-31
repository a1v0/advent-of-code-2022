const input = require("./input.js");

const rucksackStrings = input.split("\n");

const rucksacks = rucksackStrings.map((rucksackString) => {
    const firstCompartment = rucksackString.slice(0, rucksackString.length / 2),
        secondCompartment = rucksackString.slice(rucksackString.length / 2);
    return { firstCompartment, secondCompartment };
});

rucksacks.forEach((rucksack) => {
    for (let letter of rucksack.firstCompartment) {
        if (rucksack.secondCompartment.includes(letter)) {
            rucksack.commonItem = letter;
            break;
        }
    }
});

const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const priorityTotals = rucksacks.map((rucksack) => {
    return letters.indexOf(rucksack.commonItem) + 1;
});

const priorityTotal = priorityTotals.reduce((currentTotal, currentValue) => {
    return currentTotal + currentValue;
}, 0);

console.log(priorityTotal);
