const { input } = require("./input");

const cubesStrings = input.split("\n");

// map lines into some sort of pseudo-graph of objects, e.g. { coordinates: [], coordinatesAsString:'1,2,3', sidesShowing: 6, topNeighbour: '1,2,3', bottomNeighbour: '2,3,4' ... }
const cubes = cubesStrings.map((cubeString) => {
    const cube = { coordinatesAsString: cubeString, sidesShowing: 6 };

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

    return cube;
});

cubes.forEach((cube) => {
    const rightNeighbour = cubes.find((potentialNeighbourCube) => {
        return (
            potentialNeighbourCube.coordinatesAsString === cube.rightNeighbour
        );
    });
    
    const leftNeighbour = cubes.find((potentialNeighbourCube) => {
        return (
            potentialNeighbourCube.coordinatesAsString === cube.leftNeighbour
        );
    });
    
    const topNeighbour = cubes.find((potentialNeighbourCube) => {
        return potentialNeighbourCube.coordinatesAsString === cube.topNeighbour;
    });
    
    const bottomNeighbour = cubes.find((potentialNeighbourCube) => {
        return (
            potentialNeighbourCube.coordinatesAsString === cube.bottomNeighbour
        );
    });
    
    const frontNeighbour = cubes.find((potentialNeighbourCube) => {
        return (
            potentialNeighbourCube.coordinatesAsString === cube.frontNeighbour
        );
    });
    
    const backNeighbour = cubes.find((potentialNeighbourCube) => {
        return (
            potentialNeighbourCube.coordinatesAsString === cube.backNeighbour
        );
    });

    if (rightNeighbour) decreaseSidesShowing(cube);
    if (leftNeighbour) decreaseSidesShowing(cube);
    if (topNeighbour) decreaseSidesShowing(cube);
    if (bottomNeighbour) decreaseSidesShowing(cube);
    if (frontNeighbour) decreaseSidesShowing(cube);
    if (backNeighbour) decreaseSidesShowing(cube);

    function decreaseSidesShowing(cube) {
        --cube.sidesShowing;
    }
});

const sidesShowing = cubes.reduce((accumulator, currentCube) => {
    return accumulator + currentCube.sidesShowing;
}, 0);

console.log(sidesShowing);
