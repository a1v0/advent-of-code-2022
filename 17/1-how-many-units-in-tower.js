const { input } = require("./input");

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

const blockedCoordinates = new Set();

let rocksCounter = 0;

let currentInstructionIndex = 0;

let highestYCoordinate = -1;

while (rocksCounter < 2022) {
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

    while (!isCurrentRockAtRest) {
        const currentInstruction = input[currentInstructionIndex];

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
            // when rock comes to rest, check if rock's highest Y is higher than current highest Y
            adjustHighestY(currentRock);
            addBlockedCoordinates(currentRock).forEach((blockedCoordinate) => {
                blockedCoordinates.add(blockedCoordinate);
            });
            isCurrentRockAtRest = true;
        }

        // increment instruction counter (or set to 0 if length is exceeded)
        currentInstructionIndex =
            currentInstructionIndex < input.length - 1
                ? currentInstructionIndex + 1
                : 0;
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
    "(test data ought to be 3068)"
); // +1 because we're counting "units", not coordinates
