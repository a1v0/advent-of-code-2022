const { input } = require("./input");

function day18Task2(input) {
    const cubesStrings = input.split("\n");

    const extremities = {
        lowestX: Infinity,
        highestX: -Infinity,
        lowestY: Infinity,
        highestY: -Infinity,
        lowestZ: Infinity,
        highestZ: -Infinity
    };

    // map lines into some sort of pseudo-graph of objects, e.g. { coordinatesAsString:'1,2,3', topNeighbour: '1,2,3', bottomNeighbour: '2,3,4' }
    const cubes = cubesStrings.map((cubeString) => {
        const cube = {
            coordinatesAsString: cubeString
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
    extendExtremities(extremities);

    let outsideCoordinates = generateCoordinateSet(extremities);

    let insideCoordinates = new Set();

    const openNeighbours = new Set();

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

        // if no neighbour, add to openNeighbours
        if (!rightNeighbour) {
            openNeighbours.add(cube.rightNeighbour);
        }

        if (!leftNeighbour) {
            openNeighbours.add(cube.leftNeighbour);
        }

        if (!topNeighbour) {
            openNeighbours.add(cube.topNeighbour);
        }

        if (!bottomNeighbour) {
            openNeighbours.add(cube.bottomNeighbour);
        }

        if (!frontNeighbour) {
            openNeighbours.add(cube.frontNeighbour);
        }

        if (!backNeighbour) {
            openNeighbours.add(cube.backNeighbour);
        }
    });

    for (let openNeighbour of openNeighbours) {
        const potentiallyOpenCoordinates = new Set();
        potentiallyOpenCoordinates.add(openNeighbour);

        let isOpen = false;

        for (let potentiallyOpenCoordinate of potentiallyOpenCoordinates) {
            if (
                exploreArea(
                    potentiallyOpenCoordinate,
                    potentiallyOpenCoordinates
                )
            ) {
                isOpen = true;
            }
        }

        if (!isOpen) {
            setInsideCoordinates(potentiallyOpenCoordinates);
        }
    }

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
}

// console.log(day18Task2(input), "Day 18");

function extendExtremities(extremities) {
    --extremities.lowestX;
    --extremities.lowestY;
    --extremities.lowestZ;
    ++extremities.highestX;
    ++extremities.highestY;
    ++extremities.highestZ;
}

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

function exploreArea(potentiallyOpenCoordinate, potentiallyOpenCoordinates) {
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
            return true;
        }

        if (insideCoordinates.has(newCoords)) {
            setInsideCoordinates(potentiallyOpenCoordinates);
            return;
        }

        if (cubesStrings.includes(newCoords)) break;

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
            return true;
        }

        if (insideCoordinates.has(newCoords)) {
            setInsideCoordinates(potentiallyOpenCoordinates);
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
            return true;
        }

        if (insideCoordinates.has(newCoords)) {
            setInsideCoordinates(potentiallyOpenCoordinates);
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
            return true;
        }

        if (insideCoordinates.has(newCoords)) {
            setInsideCoordinates(potentiallyOpenCoordinates);
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
            return true;
        }

        if (insideCoordinates.has(newCoords)) {
            setInsideCoordinates(potentiallyOpenCoordinates);
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
            return true;
        }

        if (insideCoordinates.has(newCoords)) {
            setInsideCoordinates(potentiallyOpenCoordinates);
            return;
        }

        if (cubesStrings.includes(newCoords)) break;

        potentiallyOpenCoordinates.add(newCoords);
    }
}

function setInsideCoordinates(potentiallyOpenCoordinates) {
    insideCoordinates = new Set([
        ...insideCoordinates,
        ...potentiallyOpenCoordinates
    ]);
}

module.exports = { day18Task2 };
