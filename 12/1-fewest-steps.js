const { input } = require("./input");

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
const routes = [{ nodes: [[start[0], start[1]]], distance: 0 }];

// loop through all nodes according to A* heuristic
while (shortestRouteLength === undefined) {
    const currentRoute = routes[0];
    const currentX = currentRoute.nodes[currentRoute.nodes.length - 1][0],
        currentY = currentRoute.nodes[currentRoute.nodes.length - 1][1];
    const currentLetter = rows[currentY][currentX];

    if (currentX === end[0] && currentY === end[1]) {
        shortestRouteLength = currentRoute.nodes.length;
        break;
    }

    const upY = currentY - 1,
        downY = currentY + 1,
        leftX = currentX - 1,
        rightX = currentX + 1;

    // there must be a way of being less repetitive in what follows, but I can't think of it

    // go up
    if (
        upY >= 0 &&
        letters.indexOf(currentLetter) + 1 >=
            letters.indexOf(rows[upY][currentX]) &&
        !visitedCoordinates.includes(`${currentX},${upY}`)
    ) {
        visitedCoordinates.push(`${currentX},${upY}`);
        const newRoute = [...currentRoute.nodes, [currentX, upY]];
        routes.push({
            nodes: newRoute,
            distance: distancesFromEnd[upY][currentX] + newRoute.length
        });
    }

    // go down
    if (
        downY < rows.length &&
        letters.indexOf(currentLetter) + 1 >=
            letters.indexOf(rows[downY][currentX]) &&
        !visitedCoordinates.includes(`${currentX},${downY}`)
    ) {
        visitedCoordinates.push(`${currentX},${downY}`);
        const newRoute = [...currentRoute.nodes, [currentX, downY]];
        routes.push({
            nodes: newRoute,
            distance: distancesFromEnd[downY][currentX] + newRoute.length
        });
    }

    // go left
    if (
        leftX >= 0 &&
        letters.indexOf(currentLetter) + 1 >=
            letters.indexOf(rows[currentY][leftX]) &&
        !visitedCoordinates.includes(`${leftX},${currentY}`)
    ) {
        visitedCoordinates.push(`${leftX},${currentY}`);
        const newRoute = [...currentRoute.nodes, [leftX, currentY]];
        routes.push({
            nodes: newRoute,
            distance: distancesFromEnd[currentY][leftX] + newRoute.length
        });
    }

    // go right
    if (
        rightX < rows[currentY].length &&
        letters.indexOf(currentLetter) + 1 >=
            letters.indexOf(rows[currentY][rightX]) &&
        !visitedCoordinates.includes(`${rightX},${currentY}`)
    ) {
        visitedCoordinates.push(`${rightX},${currentY}`);
        const newRoute = [...currentRoute.nodes, [rightX, currentY]];
        routes.push({
            nodes: newRoute,
            distance: distancesFromEnd[currentY][rightX] + newRoute.length
        });
    }

    routes.shift();
    routes.sort((a, b) => {
        return a.distance - b.distance;
    });
}

console.log(shortestRouteLength - 1);
