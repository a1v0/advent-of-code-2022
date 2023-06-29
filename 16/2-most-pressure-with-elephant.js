const { input } = require("./input");

function day16Task2(input) {
    // this will be trickier, methinks, because i need to keep track of two sets of minutes
    // could call my recursive method once every minute
    // add a parameter to the method about time left until Person A and B can go somewhere else
    // // if Person B needs to take five minutes to get to a location, keep track of that
    // // if PErson B's 'timer' is 0, then you can turn on the valve and move on
}

console.log(day16Task2(input));
module.exports = { day16Task2 };
