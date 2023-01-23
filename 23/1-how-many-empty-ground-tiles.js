const { input } = require("./input");

function day23Task1(input) {
    // split input into rows
    const rowsStrings = input.split("\n");

    // create array to store elves
    const elves = [];

    // map rows into this format [null (if empty), reference to elf object]
    const groveMap = rowsStrings.map((rowString, rowNo) => {
        const row = [];
        for (let i = 0; i < rowString.length; ++i) {
            if (rowString[i] === ".") {
                row.push(null);
            } else {
                // create elf objects { directions: [], position: [x, y], proposal: "x,y" }, push them to elves array and add reference to it in rows array
                elves.unshift({
                    directions: [
                        proposeNorth,
                        proposeSouth,
                        proposeWest,
                        proposeEast
                    ],
                    position: [i, rowNo]
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
                // put each move into moves object: "x,y":1. If move already exists, ++
                for (let direction of elf.directions) {
                }
            }
        });
    }
    // loop through elves again, updating values:
    // if moves["x,y"]===1, update current position in elf object AND move reference to elf within the map
    // move first direction in directions array to back (I think this is only if a move was proposed)
    // after ten rounds...
    // identify bounds of the rectangle
    // loop through map and count the empty spaces
    // function to identify occupied positions surrounding elf

    function checkOccupiedPositions({ position: [x, y] }) {
        // this function currently treats positions beyond the perimeter of the square as unoccupied.
        // Presumably this is not the desired behaviour
        //
        //
        //
        //
        //
        //
        //
        //

        const directions = {};

        // north
        if (groveMap[y - 1] && groveMap[y - 1][x]) directions.north = true;

        // northwest
        if (groveMap[y - 1] && groveMap[y - 1][x - 1])
            directions.northwest = true;

        // northeast
        if (groveMap[y - 1] && groveMap[y - 1][x + 1])
            directions.northeast = true;

        // south
        if (groveMap[y + 1] && groveMap[y + 1][x]) directions.south = true;

        // southwest
        if (groveMap[y + 1] && groveMap[y + 1][x - 1])
            directions.southwest = true;

        // southeast
        if (groveMap[y + 1] && groveMap[y + 1][x + 1])
            directions.southeast = true;

        // west
        if (groveMap[y][x - 1]) directions.west = true;

        // east
        if (groveMap[y][x + 1]) directions.east = true;

        // returns null if all surrounding positions are empty
        // or an object { N: true, ... }
        if (!Object.keys(directions).length) return null;
        else return directions;
    }

    // create four checker functions that return a coordinate string if the elf can go there, otherwise null
    function proposeNorth({ position: [x, y] }, directions) {
        const canIGo = !(
            directions.north &&
            directions.northwest &&
            directions.northeast
        );

        return canIGo ? `${x},${y - 1}` : null;
    }

    function proposeSouth({ position: [x, y] }, directions) {
        const canIGo = !(
            directions.south &&
            directions.southwest &&
            directions.southeast
        );

        return canIGo ? `${x},${y + 1}` : null;
    }

    function proposeWest({ position: [x, y] }, directions) {
        const canIGo = !(
            directions.west &&
            directions.northwest &&
            directions.southwest
        );

        return canIGo ? `${x - 1},${y}` : null;
    }

    function proposeEast({ position: [x, y] }, directions) {
        const canIGo = !(
            directions.east &&
            directions.northeast &&
            directions.southeast
        );

        return canIGo ? `${x + 1},${y}` : null;
    }
}
// console.log(day23Task1(input));
module.exports = { day23Task1 };
