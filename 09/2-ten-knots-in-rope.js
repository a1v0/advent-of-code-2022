const { input } = require("./input");

const instructionLines = input.split("\n");

const instructions = instructionLines.map((instructionLine) => {
    return instructionLine.split(" ");
});

const visitedByTail = {}; // contents formatted like this: { "x,y": true, "a,b": true }

const ropeKnotCoordinates = []; // in order from head to tail

for (let i = 0; i < 10; ++i) {
    ropeKnotCoordinates.push([0, 0]);
}

instructions.forEach(([direction, distance]) => {
    for (let i = 0; i < distance; ++i) {
        switch (direction) {
            case "U":
                ++ropeKnotCoordinates[0][1];
                break;
            case "D":
                --ropeKnotCoordinates[0][1];
                break;
            case "L":
                --ropeKnotCoordinates[0][0];
                break;
            case "R":
                ++ropeKnotCoordinates[0][0];
                break;
        }

        for (let j = 0; j < ropeKnotCoordinates.length - 1; ++j) {
            if (
                ropeKnotCoordinates[j][0] - ropeKnotCoordinates[j + 1][0] <
                    -1 ||
                ropeKnotCoordinates[j][0] - ropeKnotCoordinates[j + 1][0] > 1 ||
                ropeKnotCoordinates[j][1] - ropeKnotCoordinates[j + 1][1] <
                    -1 ||
                ropeKnotCoordinates[j][1] - ropeKnotCoordinates[j + 1][1] > 1
            ) {
                // if they share same y
                if (
                    ropeKnotCoordinates[j][1] === ropeKnotCoordinates[j + 1][1]
                ) {
                    ropeKnotCoordinates[j][0] < ropeKnotCoordinates[j + 1][0]
                        ? --ropeKnotCoordinates[j + 1][0]
                        : ++ropeKnotCoordinates[j + 1][0];
                }
                // if they share the same x
                else if (
                    ropeKnotCoordinates[j][0] === ropeKnotCoordinates[j + 1][0]
                ) {
                    ropeKnotCoordinates[j][1] < ropeKnotCoordinates[j + 1][1]
                        ? --ropeKnotCoordinates[j + 1][1]
                        : ++ropeKnotCoordinates[j + 1][1];
                }
                // up right
                else if (
                    ropeKnotCoordinates[j][0] > ropeKnotCoordinates[j + 1][0] &&
                    ropeKnotCoordinates[j][1] > ropeKnotCoordinates[j + 1][1]
                ) {
                    ++ropeKnotCoordinates[j + 1][0];
                    ++ropeKnotCoordinates[j + 1][1];
                }
                // up left
                else if (
                    ropeKnotCoordinates[j][0] < ropeKnotCoordinates[j + 1][0] &&
                    ropeKnotCoordinates[j][1] > ropeKnotCoordinates[j + 1][1]
                ) {
                    --ropeKnotCoordinates[j + 1][0];
                    ++ropeKnotCoordinates[j + 1][1];
                }
                // down right
                else if (
                    ropeKnotCoordinates[j][0] > ropeKnotCoordinates[j + 1][0] &&
                    ropeKnotCoordinates[j][1] < ropeKnotCoordinates[j + 1][1]
                ) {
                    ++ropeKnotCoordinates[j + 1][0];
                    --ropeKnotCoordinates[j + 1][1];
                }
                // down left
                else if (
                    ropeKnotCoordinates[j][0] < ropeKnotCoordinates[j + 1][0] &&
                    ropeKnotCoordinates[j][1] < ropeKnotCoordinates[j + 1][1]
                ) {
                    --ropeKnotCoordinates[j + 1][0];
                    --ropeKnotCoordinates[j + 1][1];
                }
            }
        }
        visitedByTail[
            `${ropeKnotCoordinates[9][0]},${ropeKnotCoordinates[9][1]}`
        ] = true;
    }
});

const noOfLocationsVisited = Object.keys(visitedByTail).length;
console.log(noOfLocationsVisited);
