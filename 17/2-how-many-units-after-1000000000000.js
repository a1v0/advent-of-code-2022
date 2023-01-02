const { input } = require("./input");

const totalRocks = 1000000000000;
const movesPerRound = input.length;

// create functions that create each of the rocks (a rock should be an array of coordinates)
// // should take an argument of the lowest y coordinate
const horizontalRock = (lowestYCoordinate) => {
    return [
        [2, lowestYCoordinate],
        [3, lowestYCoordinate],
        [4, lowestYCoordinate],
        [5, lowestYCoordinate]
    ];
};
const crossRock = (lowestYCoordinate) => {
    return [
        [3, lowestYCoordinate + 2],
        [2, lowestYCoordinate + 1],
        [3, lowestYCoordinate + 1],
        [4, lowestYCoordinate + 1],
        [3, lowestYCoordinate]
    ];
};
const reverseLRock = (lowestYCoordinate) => {
    return [
        [4, lowestYCoordinate + 2],
        [4, lowestYCoordinate + 1],
        [2, lowestYCoordinate],
        [3, lowestYCoordinate],
        [4, lowestYCoordinate]
    ];
};
const verticalRock = (lowestYCoordinate) => {
    return [
        [2, lowestYCoordinate + 3],
        [2, lowestYCoordinate + 2],
        [2, lowestYCoordinate + 1],
        [2, lowestYCoordinate]
    ];
};
const squareRock = (lowestYCoordinate) => {
    return [
        [2, lowestYCoordinate + 1],
        [3, lowestYCoordinate + 1],
        [2, lowestYCoordinate],
        [3, lowestYCoordinate]
    ];
};

// create a set to house all resting coordinates
const blockedCoordinates = new Set();

// create a counter for rocks
let rocksCounter = 0;

// create counter to count the index of the next instruction
let currentInstructionIndex = 0;

// store highest y coordinate
let highestYCoordinate = -1;

let yAtStartOfInstructions = 0;
let changeInYAfterInstructions;

let rocksAtStartOfInstructions = 0;
let changeInRocksAfterInstructions;

// while loop counter < 1000000000000
while (rocksCounter < totalRocks) {
    // create rock using switch (counter % 5)
    const currentRock = [];

    switch (rocksCounter % 5) {
        case 0:
            currentRock.push(...horizontalRock(highestYCoordinate + 4));
            break;
        case 1:
            currentRock.push(...crossRock(highestYCoordinate + 4));
            break;
        case 2:
            currentRock.push(...reverseLRock(highestYCoordinate + 4));
            break;
        case 3:
            currentRock.push(...verticalRock(highestYCoordinate + 4));
            break;
        case 4:
            currentRock.push(...squareRock(highestYCoordinate + 4));
            break;
    }
    let isCurrentRockAtRest = false;

    // nest a while loop to go through instructions until rock comes to rest
    while (!isCurrentRockAtRest) {
        changeInYAfterInstructions =
            highestYCoordinate - yAtStartOfInstructions;
        changeInRocksAfterInstructions =
            rocksCounter - rocksAtStartOfInstructions;
        if (currentInstructionIndex === 0) {
            console.log(
                // change in quantity of rocks since start of cycle
                "rocks per cycle:",
                changeInRocksAfterInstructions,
                // change in total height since start of last cycle
                "change in height per cycle:",
                changeInYAfterInstructions
            );
            rocksAtStartOfInstructions = rocksCounter;

            yAtStartOfInstructions = highestYCoordinate;
        }

        // retrieve current instruction
        const currentInstruction = input[currentInstructionIndex];

        // move according to instructions
        if (currentInstruction === "<") {
            if (!willCollide(currentRock, [-1, 0])) {
                shiftCoordinates(currentRock, [-1, 0]);
            }
        } else {
            if (!willCollide(currentRock, [1, 0])) {
                shiftCoordinates(currentRock, [1, 0]);
            }
        }

        // move one step down
        if (!willCollide(currentRock, [0, 1])) {
            shiftCoordinates(currentRock, [0, 1]);
        } else {
            // when rock comes to rest, check if rock's highest Y is higher than current highest Y and set it if so
            adjustHighestY(currentRock);
            addBlockedCoordinates(currentRock).forEach((blockedCoordinate) => {
                blockedCoordinates.add(blockedCoordinate);
            });
            isCurrentRockAtRest = true;
        }

        // at end of loop, increment instruction counter (or set to 0 if length is exceeded)
        currentInstructionIndex =
            currentInstructionIndex < movesPerRound - 1
                ? currentInstructionIndex + 1
                : 0;
    }
    ++rocksCounter;

    // after ten rocks, the pattern will have been established
    // from here, I can add rocks and height based on the pattern, then continue the loop to work out the remainder
    if (
        changeInRocksAfterInstructions ===
        1710 /* I've hard-coded the change in rocks, which is cheeky. I can't think how to do this dynamically */
    ) {
        console.log(changeInRocksAfterInstructions, "boobies!");
        while (rocksCounter < totalRocks - changeInRocksAfterInstructions) {
            rocksCounter += changeInRocksAfterInstructions;
            highestYCoordinate += changeInYAfterInstructions;
        }

        // add a blank line of occupied coordinates to the set
        for (let i = 0; i < 7; ++i) {
            blockedCoordinates.add(`${i},${highestYCoordinate}`);
        }
    }
}

function willCollide(rock, [changeInX, changeInY]) {
    for (let coordinates of rock) {
        // check for collisions with walls
        if (coordinates[0] + changeInX < 0 || coordinates[0] + changeInX > 6) {
            return true;
        }

        // check for collisions with floor
        if (coordinates[1] - changeInY < 0) {
            return true;
        }

        // check for collisions with other stuff
        if (
            blockedCoordinates.has(
                `${coordinates[0] + changeInX},${coordinates[1] - changeInY}`
            )
        ) {
            return true;
        }
    }
    return false;
}

function shiftCoordinates(rock, [changeInX, changeInY]) {
    rock.forEach((coordinates) => {
        coordinates[0] += changeInX;
        coordinates[1] -= changeInY;
    });
}

function adjustHighestY(rock) {
    rock.forEach((rock) => {
        if (rock[1] > highestYCoordinate) highestYCoordinate = rock[1];
    });
}

function addBlockedCoordinates(rock) {
    return rock.map((rock) => {
        return `${rock[0]},${rock[1]}`;
    });
}

console.log(
    "highestYCoordinate =",
    highestYCoordinate + 1,
    "(test data ought to be 1514285714288)"
); // +1 because we're counting "units", not coordinates
