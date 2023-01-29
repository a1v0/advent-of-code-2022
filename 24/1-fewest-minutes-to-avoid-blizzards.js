const { input } = require("./input");

function day24Task1(input) {
    // remove border from input
    const inputWithoutBorder = input.replace(/\#/g, "");
    const inputRows = inputWithoutBorder.split("\n");

    // create set of all valid coordinates, as well as noting the coordinates of the end
    const start = "0,0";
    const end = `${inputRows[1].length - 1},${inputRows.length - 1}`;
    const validCoordinates = new Set([start, end]);

    // create array of blizzards
    const blizzards = [];

    // map blizzards into objects and populate validCoordinates
    for (let y = 1; y < inputRows.length - 1; ++y) {
        for (let x = 0; x < inputRows[y].length; ++x) {
            validCoordinates.add(`${x},${y}`);
            if (inputRows[y][x] !== ".") {
                const blizzard = { direction: inputRows[y][x] };
                blizzard.cycle =
                    blizzard.direction === ">" || blizzard.direction === "<"
                        ? inputRows[y].length
                        : inputRows.length - 2;
                blizzard[0] = `${x},${y}`;

                // to calculate position at any given time, use currentMinute % blizzard.cycle (the exact formula may need tweak by 1 in either direction. Let's see)
                for (let i = 1; i < blizzard.cycle; ++i) {
                    const [previousXString, previousYString] =
                        blizzard[i - 1].split(",");
                    const previousX = Number(previousXString),
                        previousY = Number(previousYString);

                    if (blizzard.direction === "<") {
                        if (previousX === 0) {
                            blizzard[i] = `${blizzard.cycle - 1},${previousY}`;
                        } else {
                            blizzard[i] = `${previousX - 1},${previousY}`;
                        }
                    } else if (blizzard.direction === ">") {
                        if (previousX === blizzard.cycle - 1) {
                            blizzard[i] = `${0},${previousY}`;
                        } else {
                            blizzard[i] = `${previousX + 1},${previousY}`;
                        }
                    } else if (blizzard.direction === "v") {
                        if (previousY === blizzard.cycle - 1) {
                            blizzard[i] = `${previousX},${0}`;
                        } else {
                            blizzard[i] = `${previousX},${previousY + 1}`;
                        }
                    } else if (blizzard.direction === "^") {
                        if (previousY === 0) {
                            blizzard[i] = `${previousX},${blizzard.cycle - 1}`;
                        } else {
                            blizzard[i] = `${previousX},${previousY - 1}`;
                        }
                    }
                }
                blizzards.push(blizzard);
            }
        }
    }

    // implement some sort of A* search with time and distance from goal as metric (e.g. time * distance)
    // distance calculated by Pythagoras
    // create array to house routes. including startup route { currentPosition: [x, y], heuristic: Infinity }
    const routes = [{ currentPosition: "0,0", heuristic: Infinity }];

    // create minutes counter
    let minutes = 0;

    // while !routes[0].isEndReached
    while (routes[0].currentPosition !== end) {
        // create newRoutes array
        const newRoutes = [];

        // loop through all routes
        routes.forEach((route) => {
            // identify which directions you can go in the next minute (including not going anywhere)
            // create routes for all directions, adding coefficients, and add to newRoutes
            // POTENTIAL PROBLEM: I'm not checking whether we're visiting a space we've already been to, because the same location may present different opportunities at different points. This might result in our program running out of memory and/or taking ages
        });

        // replace existing routes with new ones
        routes.length = 0;
        routes.push(...newRoutes);

        // sort routes with shortest heuristic coming first
        routes.sort((a, b) => {
            return a.heuristic - b.heuristic;
        });
        ++minutes;
    }
    return minutes;
}

// console.log(day24Task1(input));
module.exports = { day24Task1 };
