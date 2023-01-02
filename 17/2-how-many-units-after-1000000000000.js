// new plan:
// find out how many rocks per cycle
// find out change in height after every cycle (doesn't matter if current rock isn't at rest yet)
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// This one started well, but I seem to have been wrong about my assumption that the changes in height per round of instructions repeats.
// In the test data, it repeats every seven rounds, though I cannot work whether this is a coincidence. The real input doesn't repeat every seven rounds
// But there MUST be some sort of point at which I can leap forward based off of data harvested from earlier rounds
//
//
//
//
//

// VAGUE PLAN
// find out how high the highest Y coordinate is where current currentInstructionIndex === 0, where the shape is horizontalRock and where the x coordinates are the same as the very first shape to drop
// do 1000000000000 / that height
// calculate height * result of above
// add a blank row at that max height to the set, then proceed as in Task 1 to work out the rest of the height
//
//
//
// count highest y after five cycles
// calculate total difference in height after every subsequent five cycles
// find out how many times that number fits into 1000000000000 and calculate maximum y height
// add a blank row at that max height to the set, then proceed as in Task 1 to work out the remainder of the height
// // to do this, you need to work out which rock to restart with (this might just work automatically)
//
//
//
//
//
//

const { input } = require("./input");

const totalRocks = 1000000000000;
const movesPerRound = input.length;
// console.log(movesPerRound);
// return;

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

let yAtStartOfInstructions;
let changeInYAfterInstructions;

let rocksAtStartOfInstructions = 0;

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
        if (currentInstructionIndex === 0) {
            console.log(
                // change in quantity of rocks since start of cycle
                rocksCounter - rocksAtStartOfInstructions,
                // change in total height since start of last cycle
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

        //if (currentInstructionIndex === 0) {
        //    console.log("diff:", highestYCoordinate - yAtStartOfInstructions);
        //    yAtStartOfInstructions = highestYCoordinate;
        //}
    }
    ++rocksCounter;
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
