const { input } = require("./input");

// split input into array of rows
const blockersStrings = input.split("\n");

// split each row into a selection of coordinates
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

// create array to house all blocked coordinates
const blockedCoords = [];

// store extremities of map
let leftmost = 500,
    rightmost = 500,
    lowest = 0;

// loop through rows, calculating every blocked coordinate and adding it to array
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

// create a counter to count resting grains of sand
let restingGrainsCounter = 0;

// make a while loop to drop sand until a grain of sand has reached the abyss
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

// return total amount of resting sand grains at the end
console.log(restingGrainsCounter);
