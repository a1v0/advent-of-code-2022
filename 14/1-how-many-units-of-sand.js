const { testInput: input } = require("./input");

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

// loop through rows, calculating every blocked coordinate and adding it to array
blockers.forEach((blocker) => {
    for (let i = 0; i < blocker.length - 1; ++i) {
        addBlockers(
            blocker[i],
            blocker[i + 1],
            blocker[i][0] !== blocker[i + 1][0] ? 0 : 1 // this may cause trouble if there are 'lines' with just one element. In case of errors, stick another ternary on the back of it
        );
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

console.log(blockers);
console.log(blockedCoords);

// identify (HOW?) where the edges of the grid are, to find out where a grain of sand needs to be before it tumbles into the abyss
// create a counter to count resting grains of sand
// make a while loop to drop sand until a grain of sand has reached the abyss
// nest a while loop inside to move a grain until it comes to rest
// return total amount of resting sand grains at the end
