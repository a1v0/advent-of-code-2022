const { input } = require("./input");

// split input into lines of instructions
const instructionLines = input.split("\n");

// map instructions into two-part arrays
const instructions = instructionLines.map((instructionLine) => {
    return instructionLine.split(" ");
});

// create an object to hold all locations visited by tail (something like this: { [x,y]:true, [a,b]:true })
const visitedByTail = {};

// coordinates now an array going from head to tail in order
const coordinates = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0]
];

instructions.forEach(([direction, distance]) => {
    for (let i = 0; i < distance; ++i) {
        switch (direction) {
            case "U":
                ++coordinates[0][1];
                break;
            case "D":
                --coordinates[0][1];
                break;
            case "L":
                --coordinates[0][0];
                break;
            case "R":
                ++coordinates[0][0];
                break;
        }

        for (let j = 0; j < coordinates.length - 1; ++j) {
            if (
                coordinates[j][0] - coordinates[j + 1][0] < -1 ||
                coordinates[j][0] - coordinates[j + 1][0] > 1 ||
                coordinates[j][1] - coordinates[j + 1][1] < -1 ||
                coordinates[j][1] - coordinates[j + 1][1] > 1
            ) {
                // if they share same y
                if (coordinates[j][1] === coordinates[j + 1][1]) {
                    coordinates[j][0] < coordinates[j + 1][0]
                        ? --coordinates[j + 1][0]
                        : ++coordinates[j + 1][0];
                }
                // if they share the same x
                else if (coordinates[j][0] === coordinates[j + 1][0]) {
                    coordinates[j][1] < coordinates[j + 1][1]
                        ? --coordinates[j + 1][1]
                        : ++coordinates[j + 1][1];
                }
                // up right
                else if (
                    coordinates[j][0] > coordinates[j + 1][0] &&
                    coordinates[j][1] > coordinates[j + 1][1]
                ) {
                    ++coordinates[j + 1][0];
                    ++coordinates[j + 1][1];
                }
                // up left
                else if (
                    coordinates[j][0] < coordinates[j + 1][0] &&
                    coordinates[j][1] > coordinates[j + 1][1]
                ) {
                    --coordinates[j + 1][0];
                    ++coordinates[j + 1][1];
                }
                // down right
                else if (
                    coordinates[j][0] > coordinates[j + 1][0] &&
                    coordinates[j][1] < coordinates[j + 1][1]
                ) {
                    ++coordinates[j + 1][0];
                    --coordinates[j + 1][1];
                }
                // down left
                else if (
                    coordinates[j][0] < coordinates[j + 1][0] &&
                    coordinates[j][1] < coordinates[j + 1][1]
                ) {
                    --coordinates[j + 1][0];
                    --coordinates[j + 1][1];
                } else {
                    console.log("hello!", coordinates[j], coordinates[j + 1]);
                }
            }
        }
        visitedByTail[`${coordinates[9][0]},${coordinates[9][1]}`] = true;
        // console.log(coordinates);
    }
});

// return length of keys of locations object
console.log(Object.keys(visitedByTail).length);
