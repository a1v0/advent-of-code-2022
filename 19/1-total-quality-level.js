const { input } = require("./input");

/**
 * This solution is a brute-force solution.
 * I'm not overly happy about it, but I can't
 * find any shortcut or heuristic on which to
 * base any alternative solution.
 */

// Trial and error algo
// Loop over all blueprints
//     Add a console log every time a new blueprint starts
// Backtracking/recursion
//     Given we’re running for just 20-odd minutes, we shouldn’t run into problems re: reaching the stack limit
//     However, it might take a while to run, since it’s essentially a brute-force method that has to evaluate every single possibility
//         Is there a way to filter out ones that are unlikely to yield anything good?
// Evaluate every single combination by doing the following every time:
//     Build every type of robot you can
//     Build nothing
// When we reach the maximum amount of minutes, update the maximum number of geodes, then return
//     Possibly add a log every time we reach this point, just so we know how fast/slow the script is running
//     If it’s cluttered, then perhaps every time the max number is updated
// Do the addition etc.

const day19Task1 = (input) => {
    // split input into rows
    // map rows into array of blueprint objects detailing the costs
    //    e.g. { obsidian: { ore: 2, clay: 3 } }
    // create array to house max number of geodes per blueprint
    // loop through all blueprints
    //    add a console log every time a new blueprint is opened
    //    create variable to store max number of geodes opened per blueprint
    //    create an inventory object to store no of robots and resources
    //
    // make recursive/backtracking method to recursively do each possible thing:
    //    build any robot that you can afford
    //       and
    //    don't build anything
    // when we reach 24 minutes, update no. of geodes and return
    //    possibly add a console log here (unless it's cluttered, in which case perhaps just do it every time we update the max. geodes value)
    //
    // determine quality level
};

console.log(day19Task1(input));

module.exports = { day19Task1 };
