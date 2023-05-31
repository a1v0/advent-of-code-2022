const { input } = require("./input");

const blockersStrings = input.split("\n");

const blockers = blockersStrings.map((blockersString) => {
    const coordsStrings = blockersString.split(" -> ");
    const coords = coordsStrings.map((coordsString) => {
        const coords = coordsString.split(",");
        coordsNums = coords.map((coords) => {
            return Number(coords);
        });
        return coordsNums;
    });
    return coords;
});

const blockedCoords = [];

// extremities
let lowest = 0;

blockers.forEach((blocker) => {
    for (let i = 0; i < blocker.length - 1; ++i) {
        addBlockers(
            blocker[i],
            blocker[i + 1],
            blocker[i][0] !== blocker[i + 1][0] ? 0 : 1
        );

        // identify lowest point of grid
        if (blocker[i][1] > lowest) lowest = blocker[i][1];
        if (blocker[i + 1][1] > lowest) lowest = blocker[i + 1][1];
    }
});
lowest += 2; // set lowest to be 2 lower than last rock

function addBlockers(start, end, xOrY) {
    // needs to take into account whether it goes up, down, left or right
    const higherNumber = start[xOrY] < end[xOrY] ? end : start;
    const lowerNumber = start[xOrY] < end[xOrY] ? start : end;

    for (let i = 0; i <= higherNumber[xOrY] - lowerNumber[xOrY]; ++i) {
        const blockedCoord =
            xOrY === 0
                ? `${lowerNumber[0] + i},${lowerNumber[1]}`
                : `${lowerNumber[0]},${lowerNumber[1] + i}`;
        if (!blockedCoords.includes(blockedCoord)) {
            blockedCoords.push(blockedCoord);
        }
    }
}

let restingGrainsCounter = 0;

let currentX = 500,
    currentY = -1;

while (!blockedCoords.includes("500,0")) {
    if (
        !blockedCoords.includes(`${currentX},${currentY + 1}`) &&
        currentY + 1 < lowest
    ) {
        ++currentY;
        continue;
    } else if (
        !blockedCoords.includes(`${currentX - 1},${currentY + 1}`) &&
        currentY + 1 < lowest
    ) {
        --currentX;
        ++currentY;
        continue;
    } else if (
        !blockedCoords.includes(`${currentX + 1},${currentY + 1}`) &&
        currentY + 1 < lowest
    ) {
        ++currentX;
        ++currentY;
        continue;
    }

    blockedCoords.push(`${currentX},${currentY}`);
    ++restingGrainsCounter;
    currentX = 500;
    currentY = -1;
}

console.log(restingGrainsCounter);
