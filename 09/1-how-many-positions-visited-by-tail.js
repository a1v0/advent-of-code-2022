const { input } = require("./input");

const instructionLines = input.split("\n");

const instructions = instructionLines.map((instructionLine) => {
    return instructionLine.split(" ");
});

const visitedByTail = {}; // formatted like { "x,y": true, "a,b": true }

const currentHeadAndTailCoordinates = { head: [0, 0], tail: [0, 0] };

instructions.forEach(([direction, distance]) => {
    for (let i = 0; i < distance; ++i) {
        switch (direction) {
            case "U":
                ++currentHeadAndTailCoordinates.head[1];
                break;
            case "D":
                --currentHeadAndTailCoordinates.head[1];
                break;
            case "L":
                --currentHeadAndTailCoordinates.head[0];
                break;
            case "R":
                ++currentHeadAndTailCoordinates.head[0];
                break;
        }

        const headX = currentHeadAndTailCoordinates.head[0];
        const tailX = currentHeadAndTailCoordinates.tail[0];
        const headY = currentHeadAndTailCoordinates.head[1];
        const tailY = currentHeadAndTailCoordinates.tail[1];

        if (
            headX - tailX < -1 ||
            headX - tailX > 1 ||
            headY - tailY < -1 ||
            headY - tailY > 1
        ) {
            // if they share same y
            if (headY === tailY) {
                direction === "L"
                    ? --currentHeadAndTailCoordinates.tail[0]
                    : ++currentHeadAndTailCoordinates.tail[0];
            }
            // if they share the same x
            else if (headX === tailX) {
                direction === "D"
                    ? --currentHeadAndTailCoordinates.tail[1]
                    : ++currentHeadAndTailCoordinates.tail[1];
            }
            // if it's distant and diagonal
            else {
                // up right
                if (headX > tailX && headY > tailY) {
                    ++currentHeadAndTailCoordinates.tail[0];
                    ++currentHeadAndTailCoordinates.tail[1];
                }
                // up left
                else if (headX < tailX && headY > tailY) {
                    --currentHeadAndTailCoordinates.tail[0];
                    ++currentHeadAndTailCoordinates.tail[1];
                }
                // down right
                else if (headX > tailX && headY < tailY) {
                    ++currentHeadAndTailCoordinates.tail[0];
                    --currentHeadAndTailCoordinates.tail[1];
                }
                // down left
                else {
                    --currentHeadAndTailCoordinates.tail[0];
                    --currentHeadAndTailCoordinates.tail[1];
                }
            }
        }
        visitedByTail[
            `${currentHeadAndTailCoordinates.tail[0]},${currentHeadAndTailCoordinates.tail[1]}`
        ] = true;
    }
});

const quantityVisitedByTail = Object.keys(visitedByTail).length;

console.log(quantityVisitedByTail);
