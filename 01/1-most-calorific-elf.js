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
// should return 68292

module.exports = { elfCaloriesTotals };

/*
ORIGINAL FORM BEFORE REFACTOR

const splitCalories = input.split("\n");
let highestNo = 0;
let tempNo = 0;

splitCalories.forEach((item) => {
    if (item != "") {
        tempNo += Number(item);
    } else {
        if (tempNo > highestNo) {
            highestNo = tempNo;
        }
        tempNo = 0;
    }
});

console.log(highestNo);
*/
