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
                    directions: [],
                    //
                    //
                    //
                    //
                    // INSERT REFERENCE TO ALL FOUR FUNCTIONS HERE
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
                    position: [i, rowNo]
                });
                row.push(elves[0]);
            }
        }
        return row;
    });
    console.log(groveMap);

    // create four checker functions that return true if the elf should propose to go somewhere
    // for loop to go through procedure ten times
    // create empty moves object
    // loop through elves, proposing moves (string of coordinates or null if we're staying put)
    // put each move into moves object: "x,y":1. If move already exists, ++
    // loop through elves again, updating values:
    // if moves["x,y"]===1, update current position in elf object AND move reference to elf within the map
    // move first direction in directions array to back (I think this is only if a move was proposed)
    // after ten rounds...
    // identify bounds of the rectangle
    // loop through map and count the empty spaces
}
// console.log(day23Task1(input));
module.exports = { day23Task1 };

// function to identify occupied positions surrounding elf
function checkOccupiedPositions(elf) {
    // returns null if all surrounding positions are empty
    // or an object { N: true, NE: false, ... }
}
