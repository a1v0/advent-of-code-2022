// I'm exceeding the max call stack almost immediately with this solution
// the problem is that, while it might not be too difficult to calculate a SHORT route through the input, to calculate THE shortest route requires going back on yourself and investigating every single path at every moment, given how all the blizzards are forever changing
// I for the moment can't think of a way to investigate every route without storing it somewhere
// I'm pretty sure that "go down the shortest path from every point" isn't going to give the overall shortest path
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

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
    const routes = [
        { currentPosition: "0,0", heuristic: calculateHeuristic("0,0", end) }
    ];

    // create minutes counter
    let minutes = 0;

    // while !routes[0].isEndReached
    while (routes[0].currentPosition !== end) {
        // create newRoutes array
        const newRoutes = [];

        // loop through all routes
        routes.forEach((route) => {
            // identify which directions you can go in the next minute (including not going anywhere)
            const [x, y] = route.currentPosition.split(",");
            // check here
            if (
                !blizzards.find((blizzard) => {
                    return (
                        blizzard[(minutes + 1) % blizzard.cycle] === `${x},${y}`
                    );
                })
            ) {
                newRoutes.push({
                    currentPosition: `${x},${y}`,
                    heuristic: calculateHeuristic(`${x},${y}`, end)
                });
            }

            // check up
            if (
                !blizzards.find((blizzard) => {
                    return (
                        blizzard[(minutes + 1) % blizzard.cycle] ===
                        `${x},${y - 1}`
                    );
                })
            ) {
                newRoutes.push({
                    currentPosition: `${x},${y - 1}`,
                    heuristic: calculateHeuristic(`${x},${y - 1}`, end)
                });
            }

            // check down
            if (
                !blizzards.find((blizzard) => {
                    return (
                        blizzard[(minutes + 1) % blizzard.cycle] ===
                        `${x},${y + 1}`
                    );
                })
            ) {
                newRoutes.push({
                    currentPosition: `${x},${y + 1}`,
                    heuristic: calculateHeuristic(`${x},${y + 1}`, end)
                });
            }

            // check left
            if (
                !blizzards.find((blizzard) => {
                    return (
                        blizzard[(minutes + 1) % blizzard.cycle] ===
                        `${x - 1},${y}`
                    );
                })
            ) {
                newRoutes.push({
                    currentPosition: `${x - 1},${y}`,
                    heuristic: calculateHeuristic(`${x - 1},${y}`, end)
                });
            }

            // check right
            if (
                !blizzards.find((blizzard) => {
                    return (
                        blizzard[(minutes + 1) % blizzard.cycle] ===
                        `${x + 1},${y}`
                    );
                })
            ) {
                newRoutes.push({
                    currentPosition: `${x + 1},${y}`,
                    heuristic: calculateHeuristic(`${x + 1},${y}`, end)
                });
            }
            // POTENTIAL PROBLEM: I'm not checking whether we're visiting a space we've already been to, because the same location may present different opportunities at different points. This might result in our program running out of memory and/or taking ages
        });

        // replace existing routes with new ones
        routes.length = 0;
        routes.push(...newRoutes);
        console.log(routes);

        // sort routes with shortest heuristic coming first
        routes.sort((a, b) => {
            return a.heuristic - b.heuristic;
        });
        ++minutes;
    }
    return minutes;
}

function calculateHeuristic(coordinates, end) {
    const [x, y] = coordinates.split(",");
    const [endX, endY] = end.split(",");
    const aSquared = Math.pow(x - endX, 2);
    const bSquared = Math.pow(y - endY, 2);
    return Math.sqrt(aSquared + bSquared);
}

console.log(day24Task1(input));
module.exports = { day24Task1 };
