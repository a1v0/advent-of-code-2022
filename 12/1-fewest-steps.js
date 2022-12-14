const { input } = require("./input");

// heuristic needs fixing. It's finding a route, but it's not the shortest. It's just the first to be computed.
// need to make an array of routes. Each time you evaluate a route, sort the routes array based on the heuristic, and only ever evaluate the first route in the array

// split input into rows
const rows = input.split("\n");

// create string listing all letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// identify coordinates of start and end
const start = new Array(2); // holds x,y values of start
const end = new Array(2); // holds x,y values of end

for (let y = 0; y < rows.length; ++y) {
    if (rows[y].includes("S")) {
        start[1] = y;
        for (let x = 0; x < rows[y].length; ++x) {
            if (rows[y][x] === "S") {
                start[0] = x;
            }
        }
    }
    if (rows[y].includes("E")) {
        end[1] = y;
        for (let x = 0; x < rows[y].length; ++x) {
            if (rows[y][x] === "E") {
                end[0] = x;
            }
        }
    }
}

// create new array to list every node's distance from end
const distancesFromEnd = rows.map((row, y) => {
    const rowDistances = [];
    for (let x = 0; x < row.length; ++x) {
        const xFromEnd = Math.abs(end[0] - x),
            yFromEnd = Math.abs(end[1] - y);
        const distanceFromEnd = Math.sqrt(
            xFromEnd * xFromEnd + (yFromEnd + yFromEnd)
        );

        // const distanceFromEnd = xFromEnd + yFromEnd;

        rowDistances.push(distanceFromEnd);
    }
    return rowDistances;
});

// create array of visited nodes
const visitedCoordinates = [];

// replace E and S with normal letters to prevent confusion
rows[start[1]] = rows[start[1]].replace("S", "a");
rows[end[1]] = rows[end[1]].replace("E", "z");

let shortestRouteLength = undefined;
let currentX = start[0],
    currentY = start[1];
const currentRoute = [];

while (shortestRouteLength === undefined) {
    console.log(currentX, currentY);

    visitedCoordinates.push(`${currentX},${currentY}`);
    currentRoute.push([currentX, currentY]);

    if (currentX === end[0] && currentY === end[1]) {
        shortestRouteLength = currentRoute.length;
        break;
    }

    const directions = {};

    while (directions.y === undefined || directions.x === undefined) {
        const currentLetter = rows[currentY][currentX];
        const upY = currentY - 1,
            downY = currentY + 1,
            leftX = currentX - 1,
            rightX = currentX + 1;
        directions.distanceFromEnd = Infinity;

        // go up
        if (
            upY >= 0 &&
            letters.indexOf(currentLetter) + 1 >=
                letters.indexOf(rows[upY][currentX]) &&
            !visitedCoordinates.includes(`${currentX},${upY}`) &&
            directions.distanceFromEnd > distancesFromEnd[upY][currentX]
        ) {
            directions.distanceFromEnd = distancesFromEnd[upY][currentX];
            directions.x = currentX;
            directions.y = upY;
        }

        // go down
        if (
            downY < rows.length &&
            letters.indexOf(currentLetter) + 1 >=
                letters.indexOf(rows[downY][currentX]) &&
            !visitedCoordinates.includes(`${currentX},${downY}`) &&
            directions.distanceFromEnd > distancesFromEnd[downY][currentX]
        ) {
            directions.distanceFromEnd = distancesFromEnd[downY][currentX];
            directions.x = currentX;
            directions.y = downY;
        }

        // go left
        if (
            leftX >= 0 &&
            letters.indexOf(currentLetter) + 1 >=
                letters.indexOf(rows[currentY][leftX]) &&
            !visitedCoordinates.includes(`${leftX},${currentY}`) &&
            directions.distanceFromEnd > distancesFromEnd[currentY][leftX]
        ) {
            directions.distanceFromEnd = distancesFromEnd[currentY][leftX];
            directions.x = leftX;
            directions.y = currentY;
        }

        // go right
        if (
            rightX < rows[currentY].length &&
            letters.indexOf(currentLetter) + 1 >=
                letters.indexOf(rows[currentY][rightX]) &&
            !visitedCoordinates.includes(`${rightX},${currentY}`) &&
            directions.distanceFromEnd > distancesFromEnd[currentY][rightX]
        ) {
            directions.distanceFromEnd = distancesFromEnd[currentY][rightX];
            directions.x = rightX;
            directions.y = currentY;
        }

        // go back if there's a problem
        if (directions.y === undefined || directions.x === undefined) {
            currentRoute.pop();
            if (!currentRoute.length) {
                currentRoute.unshift([start[0], start[1]]);
            }
            currentX = currentRoute[currentRoute.length - 1][0];
            currentY = currentRoute[currentRoute.length - 1][1];
            console.log("popping");
        }
    }

    currentX = directions.x;
    currentY = directions.y;
}

console.log(shortestRouteLength - 1);
