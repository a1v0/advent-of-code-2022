const { input } = require("./input");

const instructionLines = input.split("\n");

const instructions = instructionLines.map((instructionLine) => {
    return instructionLine.split(" ");
});

const visitedByTail = {}; // formatted like { "x,y": true, "a,b": true }

// create object to house latest x/y coordinates of head and tail
const coordinates = { head: [0, 0], tail: [0, 0] };

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

        const headX=coordinates.head[0]
        const tailX=coordinates.tail[0]
        const headY=coordinates.head[1]
        const tailY=coordinates.tail[1]
        
        if (
            headX - tailX < -1 ||
            headX - tailX > 1 ||
            headY -tailY < -1 ||
       headY - tailY> 1
        ) {
            // if they share same y
            if (headY === tailY) {
                direction === "L"
                    ? --coordinates.tail[0]
                    : ++coordinates.tail[0];
            }
            // if they share the same x
            else if (headX === tailX) {
                direction === "D"
                    ? --coordinates.tail[1]
                    : ++coordinates.tail[1];
            }
            // if it's distant and diagonal
            else {
                // up right
                if (
                    headX > tailX &&
                    headY > tailY
                ) {
                    ++coordinates.tail[0];
                    ++coordinates.tail[1];
                }
                // up left
                else if (
                    headX < tailX &&
                    headY > tailY
                ) {
                    --coordinates.tail[0];
                    ++coordinates.tail[1];
                }
                // down right
                else if (
                    headX > tailX &&
                    headY < tailY
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

const quantityVisitedByTail=Object.keys(visitedByTail).length

console.log(quantityVisitedByTail);
