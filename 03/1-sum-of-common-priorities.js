const input = require("./input.js");

// my solution involves lots of iteration. I do this to make the code obvious, though it is by no means efficient

// split input text into array of rucksacks
const rucksackStrings = input.split("\n");

// map array into array of objects: { firstCompartment: "", secondCompartment: "" }
const rucksacks = rucksackStrings.map((rucksackString) => {
    const firstCompartment = rucksackString.slice(0, rucksackString.length / 2),
        secondCompartment = rucksackString.slice(rucksackString.length / 2);
    return { firstCompartment, secondCompartment };
});

// populate commonItem property
rucksacks.forEach((rucksack) => {
    for (let letter of rucksack.firstCompartment) {
        if (rucksack.secondCompartment.includes(letter)) {
            rucksack.commonItem = letter;
            break;
        }
    }
});

// create array of totals based on priority values for each rucksack's commonItem
const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const priorityTotals = rucksacks.map((rucksack) => {
    return letters.indexOf(rucksack.commonItem) + 1;
});

// reduce array to sum totals
const priorityTotal = priorityTotals.reduce((currentTotal, currentValue) => {
    return currentTotal + currentValue;
}, 0);

console.log(priorityTotal);
