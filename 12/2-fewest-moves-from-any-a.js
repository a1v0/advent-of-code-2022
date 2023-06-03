const { input } = require("./input");

const rows = input.split("\n");

const letters = "abcdefghijklmnopqrstuvwxyz";

const starts = [];
const end = new Array(2); // holds x,y values of end

findStartAndEnd(rows, starts, end);

const distancesFromEnd = rows.map((row, y) => {
    const rowDistances = [];
    for (let x = 0; x < row.length; ++x) {
        const xFromEnd = Math.abs(end[0] - x),
            yFromEnd = Math.abs(end[1] - y);
        const distanceFromEnd = Math.sqrt(
            xFromEnd * xFromEnd + yFromEnd * yFromEnd
        );
        rowDistances.push(distanceFromEnd);
    }
    return rowDistances;
});

const routeLengths = [];

starts.forEach((start) => {
    const visitedCoordinates = [];

    // replace E and S with normal letters to prevent confusion
    rows[start[1]] = rows[start[1]].replace("S", "a");
    rows[end[1]] = rows[end[1]].replace("E", "z");

    let shortestRouteLength = undefined;
    const routes = [{ nodes: [[start[0], start[1]]], distance: 0 }];

    // loop through all nodes according to A* heuristic
    while (shortestRouteLength === undefined) {
        const currentRoute = routes[0];

        if (!currentRoute) break; // in case a particular route is empty for lack of options

        const currentX = currentRoute.nodes[currentRoute.nodes.length - 1][0],
            currentY = currentRoute.nodes[currentRoute.nodes.length - 1][1];
        const currentLetter = rows[currentY][currentX];

        if (currentX === end[0] && currentY === end[1]) {
            shortestRouteLength = currentRoute.nodes.length;
            routeLengths.push(shortestRouteLength);
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
});

const shortestRouteLength = Math.min(...routeLengths);
console.log(shortestRouteLength - 1);

function findStartAndEnd(rows, starts, end) {
    for (let y = 0; y < rows.length; ++y) {
        if (rows[y].includes("a") || rows[y].includes("S")) {
            for (let x = 0; x < rows[y].length; ++x) {
                if (rows[y][x] === "a" || rows[y][x] === "S") {
                    const newStart = new Array(2);
                    newStart[1] = y;
                    newStart[0] = x;
                    starts.push(newStart);
                }
            }
        }

        if (rows[y].includes("E")) {
            end[0] = rows[y].indexOf("E");
            end[1] = y;
        }
    }
}
