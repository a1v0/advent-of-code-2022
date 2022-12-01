const { input } = require("./input.js");

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
