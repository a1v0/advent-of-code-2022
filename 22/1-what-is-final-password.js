const { input } = require("../22/input");

function day22Task1(input) {
    // use regex to extract instructions and board from input
    const instructionsString = input.match(/\w+/)[0];
    const instructions = instructionsString
        .match(/\d+|\D/g)
        .map((instruction) => {
            if (!isNaN(Number(instruction))) {
                return Number(instruction);
            }
            return instruction;
        });

    const boardString = input.match(/^[\s\#\.!]+(?=\n\n)/)[0];

    // split board into rows and columns
    const board = [];
    const boardRows = boardString.split("\n");
    boardRows.forEach((boardRow) => {
        board.push(boardRow.split(""));
    });

    // identify starting coordinates
    // create var to chart direction. It'll be a counter, and its value % 4 defines direction (right: 0, down: 1, left: 2, up: 3)
    // loop through instructions
    // // if instruction isNaN, change direction
    // // else, move
    // // if you go off the grid horizontally, wrap around
    // // if you go off the grid vertically, wrap around
    // // if you hit a # (even if this is on the other side of the wrap), stay where you are and stop the current move
    // retrieve current row + 1 (rows in the task aren't zero-indexed) * 1000
    // retrieve current column + 1 (columns in the task aren't zero-indexed) * 4
    // retrieve current direction value (direction % 4)
    // return sum of these

    return;
}
// console.log(day22Task1(input));
module.exports = { day22Task1 };
