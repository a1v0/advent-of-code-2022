const { input } = require("./input");

// split input into lines of instructions
const instructionLines = input.split("\n");

// map instructions into two-part arrays
const instructions = instructionLines.map((instructionLine) => {
    return instructionLine.split(" ");
});

// create an object to hold all locations visited by tail (something like this: { [x,y]:true, [a,b]:true })
const visitedByTail = {};

// create object to house latest x/y coordinates of head and tail
const coordinates = { head: [0, 0], tail: [0, 0] };

// loop through instructions, updating objects as I go
instructions.forEach(([direction, distance]) => {
    for (let i = 0; i < distance; ++i) {
        switch (direction) {
            case "U":
                ++coordinates.head[1];
                break;
            case "D":
                --coordinates.head[1];
                break;
            case "L":
                --coordinates.head[0];
                break;
            case "R":
                ++coordinates.head[0];
                break;
        }

        if (
            coordinates.head[0] - coordinates.tail[0] < -1 ||
            coordinates.head[0] - coordinates.tail[0] > 1 ||
            coordinates.head[1] - coordinates.tail[1] < -1 ||
            coordinates.head[1] - coordinates.tail[1] > 1
        ) {
            // if they share same y
            if (coordinates.head[1] === coordinates.tail[1]) {
                direction === "L"
                    ? --coordinates.tail[0]
                    : ++coordinates.tail[0];
            }
            // if they share the same x
            else if (coordinates.head[0] === coordinates.tail[0]) {
                direction === "D"
                    ? --coordinates.tail[1]
                    : ++coordinates.tail[1];
            }
            // if it's distant and diagonal
            else {
                // up right
                if (
                    coordinates.head[0] > coordinates.tail[0] &&
                    coordinates.head[1] > coordinates.tail[1]
                ) {
                    ++coordinates.tail[0];
                    ++coordinates.tail[1];
                }
                // up left
                else if (
                    coordinates.head[0] < coordinates.tail[0] &&
                    coordinates.head[1] > coordinates.tail[1]
                ) {
                    --coordinates.tail[0];
                    ++coordinates.tail[1];
                }
                // down right
                else if (
                    coordinates.head[0] > coordinates.tail[0] &&
                    coordinates.head[1] < coordinates.tail[1]
                ) {
                    ++coordinates.tail[0];
                    --coordinates.tail[1];
                }
                // down left
                else {
                    --coordinates.tail[0];
                    --coordinates.tail[1];
                }
            }
        }
        visitedByTail[`${coordinates.tail[0]},${coordinates.tail[1]}`] = true;
    }
});

// return length of keys of locations object
console.log(Object.keys(visitedByTail).length);
