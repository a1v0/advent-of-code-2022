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

// extremities of map
let leftmost = 500,
    rightmost = 500,
    lowest = 0;

blockers.forEach((blocker) => {
    for (let i = 0; i < blocker.length - 1; ++i) {
        addBlockers(
            blocker[i],
            blocker[i + 1],
            blocker[i][0] !== blocker[i + 1][0] ? 0 : 1
        );

        // identify extremities of grid
        if (blocker[i][0] < leftmost) leftmost = blocker[i][0];
        if (blocker[i + 1][0] < leftmost) leftmost = blocker[i + 1][0];
        if (blocker[i][0] > rightmost) rightmost = blocker[i][0];
        if (blocker[i + 1][0] > rightmost) rightmost = blocker[i + 1][0];

        if (blocker[i][1] > lowest) lowest = blocker[i][1];
        if (blocker[i + 1][1] > lowest) lowest = blocker[i + 1][1];
    }
});

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
    currentY = 0;

while (currentX >= leftmost && currentX <= rightmost && currentY < lowest) {
    if (!blockedCoords.includes(`${currentX},${currentY + 1}`)) {
        ++currentY;
        continue;
    } else if (!blockedCoords.includes(`${currentX - 1},${currentY + 1}`)) {
        --currentX;
        ++currentY;
        continue;
    } else if (!blockedCoords.includes(`${currentX + 1},${currentY + 1}`)) {
        ++currentX;
        ++currentY;
        continue;
    }

    if (currentX >= leftmost && currentX <= rightmost && currentY < lowest) {
        blockedCoords.push(`${currentX},${currentY}`);
        ++restingGrainsCounter;
        currentX = 500;
        currentY = 0;
    }
}

console.log(restingGrainsCounter);
