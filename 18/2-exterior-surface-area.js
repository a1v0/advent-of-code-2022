// This code is slow and inelegant, given how often it loops
// I'm not fully sure how I'd refactor it without needing to loop in six directions each time, though
//
//
//
//
//
//
//

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

    // map lines into some sort of pseudo-graph of objects, e.g. { coordinates: [], coordinatesAsString:'1,2,3', noOfSidesShowing: 6, topNeighbour: '1,2,3', bottomNeighbour: '2,3,4' }
    const cubes = cubesStrings.map((cubeString) => {
        const cube = {
            coordinatesAsString: cubeString,
            noOfSidesShowing: 6
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

    // set to house all coordinates known to be outside the lava
    let outsideCoordinates = generateCoordinateSet(extremities);

    // set to house all unoccupied coordinates inside the lava
    let insideCoordinates = new Set();

    // set to house any unoccupied neighbour cubes that might be external
    const openNeighbours = new Set();

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

        // // if neighbour exists, deduct 1 from noOfSidesShowing from both objects
        if (rightNeighbour) {
            decreaseNoOfSidesShowing(cube);
        } else {
            openNeighbours.add(cube.rightNeighbour);
        }

        if (leftNeighbour) {
            decreaseNoOfSidesShowing(cube);
        } else {
            openNeighbours.add(cube.leftNeighbour);
        }

        if (topNeighbour) {
            decreaseNoOfSidesShowing(cube);
        } else {
            openNeighbours.add(cube.topNeighbour);
        }

        if (bottomNeighbour) {
            decreaseNoOfSidesShowing(cube);
        } else {
            openNeighbours.add(cube.bottomNeighbour);
        }

        if (frontNeighbour) {
            decreaseNoOfSidesShowing(cube);
        } else {
            openNeighbours.add(cube.frontNeighbour);
        }

        if (backNeighbour) {
            decreaseNoOfSidesShowing(cube);
        } else {
            openNeighbours.add(cube.backNeighbour);
        }
    });

    // identify open coordinates
    for (let openNeighbour of openNeighbours) {
        const potentiallyOpenCoordinates = new Set();
        potentiallyOpenCoordinates.add(openNeighbour);

        for (let potentiallyOpenCoordinate of potentiallyOpenCoordinates) {
            exploreArea(potentiallyOpenCoordinate, potentiallyOpenCoordinates);
        }
    }

    // loop through objects to count sides showing
    return cubes.reduce((accumulator, currentCube) => {
        let sidesCount = 0;
        if (outsideCoordinates.has(currentCube.leftNeighbour)) ++sidesCount;
        if (outsideCoordinates.has(currentCube.rightNeighbour)) ++sidesCount;
        if (outsideCoordinates.has(currentCube.frontNeighbour)) ++sidesCount;
        if (outsideCoordinates.has(currentCube.backNeighbour)) ++sidesCount;
        if (outsideCoordinates.has(currentCube.topNeighbour)) ++sidesCount;
        if (outsideCoordinates.has(currentCube.bottomNeighbour)) ++sidesCount;

        return accumulator + sidesCount;
    }, 0);

    // -------------------------------------------------------------
    // Helper functions
    // -------------------------------------------------------------

    function decreaseNoOfSidesShowing(cube) {
        --cube.noOfSidesShowing;
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

    function exploreArea(
        potentiallyOpenCoordinate,
        potentiallyOpenCoordinates
    ) {
        // go in all six directions and add each empty coordinate to the set
        const coordsNumbersStrings = potentiallyOpenCoordinate.split(",");
        const [x, y, z] = coordsNumbersStrings.map((coordsNumber) => {
            return Number(coordsNumber);
        });

        // going right
        for (let newX = x; x <= extremities.highestX; ++newX) {
            const newCoords = `${newX},${y},${z}`;
            if (outsideCoordinates.has(newCoords)) {
                outsideCoordinates = new Set([
                    ...outsideCoordinates,
                    ...potentiallyOpenCoordinates
                ]);
                return;
            }

            if (insideCoordinates.has(newCoords)) {
                setInsideCoordinates();
                return;
            }

            if (cubesStrings.includes(newCoords)) break;

            // adds coordinate to explore to potentiallyOpenCoordinates
            potentiallyOpenCoordinates.add(newCoords);
        }

        // going left
        for (let newX = x; x >= extremities.lowestX; --newX) {
            const newCoords = `${newX},${y},${z}`;
            if (outsideCoordinates.has(newCoords)) {
                outsideCoordinates = new Set([
                    ...outsideCoordinates,
                    ...potentiallyOpenCoordinates
                ]);
                return;
            }

            if (insideCoordinates.has(newCoords)) {
                setInsideCoordinates();
                return;
            }

            if (cubesStrings.includes(newCoords)) break;

            potentiallyOpenCoordinates.add(newCoords);
        }

        // going up
        for (let newY = y; y <= extremities.highestY; ++newY) {
            const newCoords = `${x},${newY},${z}`;
            if (outsideCoordinates.has(newCoords)) {
                outsideCoordinates = new Set([
                    ...outsideCoordinates,
                    ...potentiallyOpenCoordinates
                ]);
                return;
            }

            if (insideCoordinates.has(newCoords)) {
                setInsideCoordinates();
                return;
            }

            if (cubesStrings.includes(newCoords)) break;

            potentiallyOpenCoordinates.add(newCoords);
        }

        // going down
        for (let newY = y; y >= extremities.lowestY; --newY) {
            const newCoords = `${x},${newY},${z}`;
            if (outsideCoordinates.has(newCoords)) {
                outsideCoordinates = new Set([
                    ...outsideCoordinates,
                    ...potentiallyOpenCoordinates
                ]);
                return;
            }

            if (insideCoordinates.has(newCoords)) {
                setInsideCoordinates();
                return;
            }

            if (cubesStrings.includes(newCoords)) break;

            potentiallyOpenCoordinates.add(newCoords);
        }

        // going front
        for (let newZ = z; z <= extremities.highestZ; ++newZ) {
            const newCoords = `${x},${y},${newZ}`;
            if (outsideCoordinates.has(newCoords)) {
                outsideCoordinates = new Set([
                    ...outsideCoordinates,
                    ...potentiallyOpenCoordinates
                ]);
                return;
            }

            if (insideCoordinates.has(newCoords)) {
                setInsideCoordinates();
                return;
            }

            if (cubesStrings.includes(newCoords)) break;

            potentiallyOpenCoordinates.add(newCoords);
        }

        // going back
        for (let newZ = z; z >= extremities.lowestZ; --newZ) {
            const newCoords = `${x},${y},${newZ}`;
            if (outsideCoordinates.has(newCoords)) {
                outsideCoordinates = new Set([
                    ...outsideCoordinates,
                    ...potentiallyOpenCoordinates
                ]);
                return;
            }

            if (insideCoordinates.has(newCoords)) {
                setInsideCoordinates();
                return;
            }

            if (cubesStrings.includes(newCoords)) break;

            potentiallyOpenCoordinates.add(newCoords);
        }

        // if we haven't returned by this point, the coordinate is closed, so we can add it to the closedCoordinates set
        setInsideCoordinates();

        function setInsideCoordinates() {
            insideCoordinates = new Set([
                ...insideCoordinates,
                ...potentiallyOpenCoordinates
            ]);
        }
    }
}

console.log(day18Task2(input), "Day 18");
module.exports = { day18Task2 };
