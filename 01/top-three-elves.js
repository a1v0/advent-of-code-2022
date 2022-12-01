const { input } = require("./input.js");

const splitCalories = input.split("\n");

// these array indices don't reflect the order of size, i.e. [0] isn't necessarily the highest number
let nums = [0, 0, 0];
let tempNo = 0;

splitCalories.forEach((item) => {
    // if it finds a number higher than any of these, it needs to update the smallest of all
    if (item !== "") {
        tempNo += Number(item);
    } else {
        if (tempNo > nums[0] || tempNo > nums[1] || tempNo > nums[2]) {
            nums[findLowestIndex(nums)] = tempNo;
        }
        tempNo = 0;
    }
});

function findLowestIndex(nums) {
    let lowestIndex = 0;
    for (let i = 0; i < nums.length; ++i) {
        if (nums[lowestIndex] > nums[i]) lowestIndex = i;
    }
    // console.log(lowestIndex);
    return lowestIndex;
}

console.log(nums[0] + nums[1] + nums[2]);
