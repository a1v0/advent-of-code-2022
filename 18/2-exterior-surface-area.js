// Flaw in code:
// my checker ignores coordinates that are accessible but blocked (e.g. X below)
// ########
// ##X#####
// #      #
//        #
// #      #
// ########
//
// New plan:
// create a set containing of all coordinates of a 'box' that surrounds the lava
// // this will need six nested for loops, I believe
// loop through every coordinate in shape
// if sidesShowing > 0:
// // create a set containing open neighbour of current coordinate
// // run a for...in loop
// // go in all six directions (like in current isAccessible function) and add each empty coordinate to the set
// // if we reach a coordinate that is in the the set of all coordinates that are accessible, add all coordinates to original set, then return true
// // if the loop ends without reaching outside, return false
// create externalSidesShowing variable
// loop through all coordinates in lava
// // if neighbour is in set of all showing coordinates, ++externalSidesShowing
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

function day18Task2(input) {
    // split input to lines
    const cubesStrings = input.split("\n");

    // collect data on highest and lowest x,y,z values
    const extremities = {
        lowestX: Infinity,
        highestX: -Infinity,
        lowestY: Infinity,
        highestY: -Infinity,
        lowestZ: Infinity,
        highestZ: -Infinity
    };

    // map lines into some sort of pseudo-graph of objects, e.g. { coordinates: [], coordinatesAsString:'1,2,3', noOfSidesShowing: 6, topNeighbour: '1,2,3', bottomNeighbour: '2,3,4', sidesShowing: [] ... }
    const cubes = cubesStrings.map((cubeString) => {
        const cube = {
            coordinatesAsString: cubeString,
            noOfSidesShowing: 6,
            sidesShowing: []
        };

        const coordinatesStrings = cubeString.split(",");
        const coordinates = coordinatesStrings.map((coordinate) => {
            return Number(coordinate);
        });
        cube.coordinates = coordinates;

        cube.topNeighbour = `${coordinates[0]},${coordinates[1] + 1},${
            coordinates[2]
        }`;
        cube.bottomNeighbour = `${coordinates[0]},${coordinates[1] - 1},${
            coordinates[2]
        }`;
        cube.leftNeighbour = `${coordinates[0] - 1},${coordinates[1]},${
            coordinates[2]
        }`;
        cube.rightNeighbour = `${coordinates[0] + 1},${coordinates[1]},${
            coordinates[2]
        }`;
        cube.frontNeighbour = `${coordinates[0]},${coordinates[1]},${
            coordinates[2] + 1
        }`;
        cube.backNeighbour = `${coordinates[0]},${coordinates[1]},${
            coordinates[2] - 1
        }`;

        // update lowest/highest values
        if (coordinates[0] < extremities.lowestX) {
            extremities.lowestX = coordinates[0];
        }
        if (coordinates[0] > extremities.highestX) {
            extremities.highestX = coordinates[0];
        }
        if (coordinates[1] < extremities.lowestY) {
            extremities.lowestY = coordinates[1];
        }
        if (coordinates[1] > extremities.highestY) {
            extremities.highestY = coordinates[1];
        }
        if (coordinates[2] < extremities.lowestZ) {
            extremities.lowestZ = coordinates[2];
        }
        if (coordinates[2] > extremities.highestZ) {
            extremities.highestZ = coordinates[2];
        }

        return cube;
    });

    // set extremities to 1 above/below to account for the empty coordinates just outside the occupied ones
    --extremities.lowestX;
    --extremities.lowestY;
    --extremities.lowestZ;
    ++extremities.highestX;
    ++extremities.highestY;
    ++extremities.highestZ;

    const outsideCoordinates = generateCoordinateSet(extremities);

    // loop through objects, checking if any potential neighbours exist
    cubes.forEach((cube) => {
        const rightNeighbour = cubes.find((potentialNeighbourCube) => {
            return (
                potentialNeighbourCube.coordinatesAsString ===
                cube.rightNeighbour
            );
        });
        const leftNeighbour = cubes.find((potentialNeighbourCube) => {
            return (
                potentialNeighbourCube.coordinatesAsString ===
                cube.leftNeighbour
            );
        });
        const topNeighbour = cubes.find((potentialNeighbourCube) => {
            return (
                potentialNeighbourCube.coordinatesAsString === cube.topNeighbour
            );
        });
        const bottomNeighbour = cubes.find((potentialNeighbourCube) => {
            return (
                potentialNeighbourCube.coordinatesAsString ===
                cube.bottomNeighbour
            );
        });
        const frontNeighbour = cubes.find((potentialNeighbourCube) => {
            return (
                potentialNeighbourCube.coordinatesAsString ===
                cube.frontNeighbour
            );
        });
        const backNeighbour = cubes.find((potentialNeighbourCube) => {
            return (
                potentialNeighbourCube.coordinatesAsString ===
                cube.backNeighbour
            );
        });

        // // if so, deduct 1 from noOfSidesShowing from both objects
        if (rightNeighbour || !isAccessibleFromOutside(cube.rightNeighbour)) {
            decreaseNoOfSidesShowing(cube);
        } else {
            cube.sidesShowing.push(cube.rightNeighbour);
        }

        if (leftNeighbour || !isAccessibleFromOutside(cube.leftNeighbour)) {
            decreaseNoOfSidesShowing(cube);
        } else {
            cube.sidesShowing.push(cube.leftNeighbour);
        }

        if (topNeighbour || !isAccessibleFromOutside(cube.topNeighbour)) {
            decreaseNoOfSidesShowing(cube);
        } else {
            cube.sidesShowing.push(cube.topNeighbour);
        }

        if (bottomNeighbour || !isAccessibleFromOutside(cube.bottomNeighbour)) {
            decreaseNoOfSidesShowing(cube);
        } else {
            cube.sidesShowing.push(cube.bottomNeighbour);
        }

        if (frontNeighbour || !isAccessibleFromOutside(cube.frontNeighbour)) {
            decreaseNoOfSidesShowing(cube);
        } else {
            cube.sidesShowing.push(cube.frontNeighbour);
        }

        if (backNeighbour || !isAccessibleFromOutside(cube.backNeighbour)) {
            decreaseNoOfSidesShowing(cube);
        } else {
            cube.sidesShowing.push(cube.backNeighbour);
        }
    });

    // loop through objects to count sides showing
    return cubes.reduce((accumulator, currentCube) => {
        return accumulator + currentCube.noOfSidesShowing;
    }, 0);

    // -------------------------------------------------------------
    // Helper functions
    // -------------------------------------------------------------

    function decreaseNoOfSidesShowing(cube) {
        --cube.noOfSidesShowing;
    }

    function isAccessibleFromOutside(coordinate) {
        const coordsNumbersStrings = coordinate.split(",");
        const coordsNumbers = coordsNumbersStrings.map((coordsNumber) => {
            return Number(coordsNumber);
        });

        // left to right
        for (let i = extremities.lowestX; i <= coordsNumbers[0]; ++i) {
            if (`${i},${coordsNumbers[1]},${coordsNumbers[2]}` === coordinate) {
                return true;
            }

            // if a cube exists with those coordinates
            else if (
                cubes.find((cube) => {
                    return (
                        cube.coordinatesAsString ===
                        `${i},${coordsNumbers[1]},${coordsNumbers[2]}`
                    );
                })
            ) {
                break;
            }
        }

        // right to left
        for (let i = extremities.highestX; i >= coordsNumbers[0]; --i) {
            if (`${i},${coordsNumbers[1]},${coordsNumbers[2]}` === coordinate) {
                return true;
            } else if (
                cubes.find((cube) => {
                    return (
                        cube.coordinatesAsString ===
                        `${i},${coordsNumbers[1]},${coordsNumbers[2]}`
                    );
                })
            ) {
                break;
            }
        }

        // top to bottom
        for (let i = extremities.highestY; i >= coordsNumbers[1]; --i) {
            if (`${coordsNumbers[0]},${i},${coordsNumbers[2]}` === coordinate) {
                return true;
            } else if (
                cubes.find((cube) => {
                    return (
                        cube.coordinatesAsString ===
                        `${coordsNumbers[0]},${i},${coordsNumbers[2]}`
                    );
                })
            ) {
                break;
            }
        }

        // bottom to top
        for (let i = extremities.lowestY; i <= coordsNumbers[1]; ++i) {
            if (`${coordsNumbers[0]},${i},${coordsNumbers[2]}` === coordinate) {
                return true;
            }
            if (
                cubes.find((cube) => {
                    return (
                        cube.coordinatesAsString ===
                        `${coordsNumbers[0]},${i},${coordsNumbers[2]}`
                    );
                })
            ) {
                break;
            }
        }

        // back to front
        for (let i = extremities.lowestZ; i <= coordsNumbers[2]; ++i) {
            if (`${coordsNumbers[0]},${coordsNumbers[1]},${i}` === coordinate) {
                return true;
            }
            if (
                cubes.find((cube) => {
                    return (
                        cube.coordinatesAsString ===
                        `${coordsNumbers[0]},${coordsNumbers[1]},${i}`
                    );
                })
            ) {
                break;
            }
        }

        // front to back
        for (let i = extremities.highestZ; i >= coordsNumbers[2]; --i) {
            if (`${coordsNumbers[0]},${coordsNumbers[1]},${i}` === coordinate) {
                return true;
            }
            if (
                cubes.find((cube) => {
                    return (
                        cube.coordinatesAsString ===
                        `${coordsNumbers[0]},${coordsNumbers[1]},${i}`
                    );
                })
            ) {
                break;
            }
        }
        return false;
    }

    // create a set containing of all coordinates of a 'box' that surrounds the lava
    function generateCoordinateSet({
        lowestX,
        highestX,
        lowestY,
        highestY,
        lowestZ,
        highestZ
    }) {
        const outsideCoordinates = new Set();

        // left face
        for (let y = lowestY; y <= highestY; ++y) {
            for (let z = lowestZ; z <= highestZ; ++z) {
                outsideCoordinates.add(`${lowestX},${y},${z}`);
            }
        }

        // right face
        for (let y = lowestY; y <= highestY; ++y) {
            for (let z = lowestZ; z <= highestZ; ++z) {
                outsideCoordinates.add(`${highestX},${y},${z}`);
            }
        }

        // front face
        for (let y = lowestY; y <= highestY; ++y) {
            for (let x = lowestX; x <= highestX; ++x) {
                outsideCoordinates.add(`${x},${y},${highestZ}`);
            }
        }

        // back face
        for (let y = lowestY; y <= highestY; ++y) {
            for (let x = lowestX; x <= highestX; ++x) {
                outsideCoordinates.add(`${x},${y},${lowestZ}`);
            }
        }

        // top face
        for (let x = lowestX; x <= highestX; ++x) {
            for (let z = lowestZ; z <= highestZ; ++z) {
                outsideCoordinates.add(`${x},${highestY},${z}`);
            }
        }

        // bottom face
        for (let x = lowestX; x <= highestX; ++x) {
            for (let z = lowestZ; z <= highestZ; ++z) {
                outsideCoordinates.add(`${x},${lowestY},${z}`);
            }
        }

        return outsideCoordinates;
    }
}

console.log(day18Task2(input), "Day 18");
module.exports = { day18Task2 };
