const { input } = require("./input");

function day23Task1(input) {
    // split input into rows
    const rowsStrings = input.split("\n");

    // create array to store elves
    const elves = [];

    // store all direction checkers
    const allDirections = [
        proposeNorth,
        proposeSouth,
        proposeWest,
        proposeEast
    ];

    // map rows into this format [null (if empty), reference to elf object]
    const groveMap = rowsStrings.map((rowString, rowNo) => {
        const row = [];
        for (let i = 0; i < rowString.length; ++i) {
            if (rowString[i] === ".") {
                row.push(null);
            } else {
                // create elf objects { directions: [], position: [x, y], proposal: "x,y" }, push them to elves array and add reference to it in rows array
                elves.unshift({
                    position: [i, rowNo],
                    proposal: null
                });
                row.push(elves[0]);
            }
        }
        return row;
    });

    // for loop to go through procedure ten times
    for (let round = 0; round < 10; ++round) {
        // create empty moves object
        const movesInRound = {};

        // loop through elves, proposing moves (string of coordinates or null if we're staying put)
        elves.forEach((elf) => {
            const occupiedPositions = checkOccupiedPositions(elf);
            if (!occupiedPositions) {
                elf.proposal = null;
            } else {
                for (let direction of allDirections) {
                    const proposal = direction(elf, occupiedPositions);
                    elf.proposal = proposal;
                    if (proposal) {
                        // put each move into moves object: "x,y":1. If move already exists, ++
                        movesInRound[proposal] = movesInRound[proposal]
                            ? movesInRound[proposal] + 1
                            : 1;
                        break;
                    }
                }
            }
        });

        // loop through elves again, updating values
        elves.forEach((elf) => {
            // if moves["x,y"]===1, update current position in elf object AND move reference to elf within the map
            if (movesInRound[elf.proposal] === 1) {
                const [x, y] = elf.position;
                const coordinates = elf.proposal.match(/\d+/g);
                const newX = Number(coordinates[0]);
                const newY = Number(coordinates[1]);

                groveMap[y][x] = null;
                groveMap[newY][newX] = elf;
                elf.position = [newX, newY];
            }
        });

        // move first direction in directions array to back
        allDirections.push(allDirections.shift());
    }

    // identify bounds of the rectangle
    const rectangle = {
        north: groveMap.length,
        south: 0,
        west: groveMap[0].length,
        east: 0
    };
    groveMap.forEach((row, rowIndex) => {
        row.forEach((position, positionIndex) => {
            if (position) {
                if (rowIndex < rectangle.north) rectangle.north = rowIndex;
                if (rowIndex > rectangle.south) rectangle.south = rowIndex;
                if (positionIndex < rectangle.west)
                    rectangle.west = positionIndex;
                if (positionIndex > rectangle.east)
                    rectangle.east = positionIndex;
            }
        });
    });

    // loop through map and count the empty spaces
    let emptySpaces = 0;
    for (let i = rectangle.north; i <= rectangle.south; ++i) {
        for (let j = rectangle.west; j <= rectangle.east; ++j) {
            if (!groveMap[i][j]) ++emptySpaces;
        }
    }

    // -------------------------------------------------------------
    // for visualisation
    // -------------------------------------------------------------
    let visualisationString = "";
    for (let row of groveMap) {
        for (let position of row) {
            if (!position) {
                visualisationString += ".";
            } else {
                visualisationString += "#";
            }
        }
        visualisationString += "\n";
    }
    console.log(visualisationString);
    // -------------------------------------------------------------

    return emptySpaces;

    // function to identify occupied positions surrounding elf
    function checkOccupiedPositions({ position: [x, y] }) {
        const occupiedPositions = {};
        let emptySlots = 0;

        // northern positions
        if (groveMap[y - 1] === undefined) {
            emptySlots += 3;
            occupiedPositions.north = true;
            occupiedPositions.northwest = true;
            occupiedPositions.northeast = true;
        } else {
            // north
            if (groveMap[y - 1] && groveMap[y - 1][x]) {
                occupiedPositions.north = true;
            } else ++emptySlots;

            // northwest
            if (groveMap[y - 1] && groveMap[y - 1][x - 1]) {
                occupiedPositions.northwest = true;
            } else ++emptySlots;

            // northeast
            if (groveMap[y - 1] && groveMap[y - 1][x + 1]) {
                occupiedPositions.northeast = true;
            } else ++emptySlots;
        }

        // southern positions
        if (groveMap[y + 1] === undefined) {
            emptySlots += 3;
            occupiedPositions.south = true;
            occupiedPositions.southwest = true;
            occupiedPositions.southwest = true;
        } else {
            // south
            if (groveMap[y + 1] && groveMap[y + 1][x]) {
                occupiedPositions.south = true;
            } else ++emptySlots;

            // southwest
            if (groveMap[y + 1] && groveMap[y + 1][x - 1]) {
                occupiedPositions.southwest = true;
            } else ++emptySlots;

            // southeast
            if (groveMap[y + 1] && groveMap[y + 1][x + 1]) {
                occupiedPositions.southeast = true;
            } else ++emptySlots;
        }

        // west
        if (groveMap[y][x - 1] === undefined) {
            ++emptySlots;
            occupiedPositions.west = true;
        } else if (groveMap[y][x - 1]) {
            occupiedPositions.west = true;
        } else ++emptySlots;

        // east
        if (groveMap[y][x + 1] === undefined) {
            ++emptySlots;
            occupiedPositions.east = true;
        } else if (groveMap[y][x + 1]) {
            occupiedPositions.east = true;
        } else ++emptySlots;

        // returns null if all surrounding positions are empty
        // or an object { north: true, ... }
        if (emptySlots === 8) {
            return null;
        } else return occupiedPositions;
    }

    // create four checker functions that return a coordinate string if the elf can go there, otherwise null
    function proposeNorth({ position: [x, y] }, occupiedPositions) {
        const canIGo =
            !occupiedPositions.north &&
            !occupiedPositions.northwest &&
            !occupiedPositions.northeast;

        return canIGo ? `${x},${y - 1}` : null;
    }

    function proposeSouth({ position: [x, y] }, occupiedPositions) {
        const canIGo =
            !occupiedPositions.south &&
            !occupiedPositions.southwest &&
            !occupiedPositions.southeast;

        return canIGo ? `${x},${y + 1}` : null;
    }

    function proposeWest({ position: [x, y] }, occupiedPositions) {
        const canIGo =
            !occupiedPositions.west &&
            !occupiedPositions.northwest &&
            !occupiedPositions.southwest;

        return canIGo ? `${x - 1},${y}` : null;
    }

    function proposeEast({ position: [x, y] }, occupiedPositions) {
        const canIGo =
            !occupiedPositions.east &&
            !occupiedPositions.northeast &&
            !occupiedPositions.southeast;

        return canIGo ? `${x + 1},${y}` : null;
    }
}
console.log(day23Task1(input)); // not 2508
module.exports = { day23Task1 };
