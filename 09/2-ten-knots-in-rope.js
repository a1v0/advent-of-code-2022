const { input } = require("./input");

const instructionLines = input.split("\n");

const instructions = instructionLines.map((instructionLine) => {
    return instructionLine.split(" ");
});

const visitedByTail = {};// contents formatted like this: { "x,y": true, "a,b": true }

// coordinates now an array going from head to tail in order
const coordinates = [];

for(let i=0;i<10;++i){
coordinates.push([0,0]);}

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
                } 
            }
        }
        visitedByTail[`${coordinates[9][0]},${coordinates[9][1]}`] = true;
    }
});

const noOfLocationsVisited=Object.keys(visitedByTail).length
console.log(noOfLocationsVisited);
