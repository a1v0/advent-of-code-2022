const { input } = require("./input");

// split input into rows
const rows = input.split("\n");

// create string listing all letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// create array to house all routes
const routeLengths = [];

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

// replace E and S with normal letters to prevent confusion
rows[start[1]] = rows[start[1]].replace("S", "a");
rows[end[1]] = rows[end[1]].replace("E", "z");

// create recursive function to move through array from a specific location
// // add any complete route to routes array
function findRoutes(
    currentRouteLength,
    currentX,
    currentY,
    visitedCoordinates
) {
    console.log(currentRouteLength);
    if (currentY === end[1] && currentX === end[0]) {
        console.log("hooray!");
        routeLengths.push(currentRouteLength);
    } else {
        const currentLetter = rows[currentY][currentX];

        // go up
        if (
            currentY - 1 >= 0 &&
            letters.indexOf(currentLetter) + 1 >=
                letters.indexOf(rows[currentY - 1][currentX]) &&
            !visitedCoordinates.includes(`${currentX},${currentY - 1}`)
        ) {
            const newVisited = [...visitedCoordinates];
            newVisited.push(`${currentX},${currentY}`);
            findRoutes(
                currentRouteLength + 1,
                currentX,
                currentY - 1,
                newVisited
            );
        }

        // go down
        if (
            currentY + 1 < rows.length &&
            letters.indexOf(currentLetter) + 1 >=
                letters.indexOf(rows[currentY + 1][currentX]) &&
            !visitedCoordinates.includes(`${currentX},${currentY + 1}`)
        ) {
            const newVisited = [...visitedCoordinates];
            newVisited.push(`${currentX},${currentY}`);
            findRoutes(
                currentRouteLength + 1,
                currentX,
                currentY + 1,
                newVisited
            );
        }

        // go left
        if (
            currentX - 1 >= 0 &&
            letters.indexOf(currentLetter) + 1 >=
                letters.indexOf(rows[currentY][currentX - 1]) &&
            !visitedCoordinates.includes(`${currentX - 1},${currentY}`)
        ) {
            const newVisited = [...visitedCoordinates];
            newVisited.push(`${currentX},${currentY}`);
            findRoutes(
                currentRouteLength + 1,
                currentX - 1,
                currentY,
                newVisited
            );
        }

        // go right
        if (
            currentX + 1 < rows[currentY].length &&
            letters.indexOf(currentLetter) + 1 >=
                letters.indexOf(rows[currentY][currentX + 1]) &&
            !visitedCoordinates.includes(`${currentX + 1},${currentY}`)
        ) {
            const newVisited = [...visitedCoordinates];
            newVisited.push(`${currentX},${currentY}`);
            findRoutes(
                currentRouteLength + 1,
                currentX + 1,
                currentY,
                newVisited
            );
        }
    }
}
findRoutes(0, start[0], start[1], []);

// once routes have been assembled, find shortest one (it might be possible to simply return the first route that is returned by the recursive function)
const shortestRoute = Math.min(...routeLengths);
console.log("Shortest route", shortestRoute);