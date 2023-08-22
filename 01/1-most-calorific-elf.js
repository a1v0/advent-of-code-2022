const { input } = require("./input.js");

const elfCaloriesStrings = input.split("\n\n");
const elfCaloriesTotals = elfCaloriesStrings.map((elfCaloriesString) => {
    const elfCaloriesTotal = elfCaloriesString.split("\n");
    return elfCaloriesTotal.reduce((calorieTotal, foodItem) => {
        return (calorieTotal += Number(foodItem));
    }, 0);
});

const mostCalorificElf = Math.max(...elfCaloriesTotals);
console.log(mostCalorificElf);

module.exports = { elfCaloriesTotals };
