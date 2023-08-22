const { elfCaloriesTotals } = require("./most-calorific-elf.js");

const sortedElfCaloriesTotals = elfCaloriesTotals.sort((a, b) => {
    return b - a;
});

const topThree = [
    sortedElfCaloriesTotals[0],
    sortedElfCaloriesTotals[1],
    sortedElfCaloriesTotals[2]
];

const total = topThree.reduce((total, currentItem) => {
    return total + currentItem;
}, 0);

console.log(total);
