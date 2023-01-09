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
    const startingX = board[0].indexOf(".");
    const currentCoordinates = [startingX, 0];

    // create var to chart direction. It'll be a counter, and its value % 4 defines direction (right: 0, down: 1, left: 2, up: 3)
    let direction = 0;

    // loop through instructions
    for (let instruction of instructions) {
        // if instruction isNaN, change direction
        if (isNaN(instruction)) {
            direction += instruction === "L" ? -1 : 1;
            continue;
        }

        // else, move
        move(instruction, direction, currentCoordinates, board);
    }

    const multipliedRow = (currentCoordinates[1] + 1) * 1000, // +1 because rows in the task aren't zero-indexed
        multipliedColumn = (currentCoordinates[0] + 1) * 4, // +1 because columns in the task aren't zero-indexed
        directionValue = direction % 4;

    return multipliedRow + multipliedColumn + directionValue;
}
// console.log(day22Task1(input));

function move(instruction, direction, currentCoordinates, board) {
    const directionValue = direction % 4;

    // this code is very repetitive. I'd love to know how to reduce that
    for (let i = 0; i < instruction; ++i) {
        // going right
        if (directionValue === 0) {
            if (
                board[currentCoordinates[1]][currentCoordinates[0] + 1] === "."
            ) {
                // if it's a valid move
                ++currentCoordinates[0];
            } else if (
                board[currentCoordinates[1]][currentCoordinates[0] + 1] !== "#"
            ) {
                // if it's undefined or a space, do a wrap, provided there's not # on the other side
                if (
                    board[currentCoordinates[1]].indexOf(".") <
                    board[currentCoordinates[1]].indexOf("#")
                ) {
                    currentCoordinates[0] =
                        board[currentCoordinates[1]].indexOf(".");
                }
            } else {
                // if it's a hash
                break;
            }
            continue;
        }

        // going left
        if (directionValue === 2) {
            if (
                board[currentCoordinates[1]][currentCoordinates[0] - 1] === "."
            ) {
                // if it's a valid move
                --currentCoordinates[0];
            } else if (
                board[currentCoordinates[1]][currentCoordinates[0] - 1] !== "#"
            ) {
                // if it's undefined or a space, do a wrap, provided there's not # on the other side
                if (
                    board[currentCoordinates[1]].lastIndexOf(".") >
                    board[currentCoordinates[1]].lastIndexOf("#")
                ) {
                    currentCoordinates[0] =
                        board[currentCoordinates[1]].lastIndexOf(".");
                }
            } else {
                // if it's a hash
                break;
            }
            continue;
        }

        // going down
        if (directionValue === 1) {
            if (
                board[currentCoordinates[1] + 1][currentCoordinates[0]] === "."
            ) {
                // if it's a valid move
                ++currentCoordinates[1];
            } else if (
                board[currentCoordinates[1] + 1][currentCoordinates[0]] !== "#"
            ) {
                for (let j = 0; j < board.length; ++j) {
                    if (board[j][currentCoordinates[0]] === "#") {
                        break;
                    } else if (board[j][currentCoordinates[0]] === ".") {
                        currentCoordinates[1] = j;
                        break;
                    }
                }
            } else {
                // if it's a hash
                break;
            }
            continue;
        }

        // going up
        if (directionValue === 3) {
            if (
                board[currentCoordinates[1] - 1][currentCoordinates[0]] === "."
            ) {
                // if it's a valid move
                --currentCoordinates[1];
            } else if (
                board[currentCoordinates[1] - 1][currentCoordinates[0]] !== "#"
            ) {
                for (let j = board.length - 1; j >= 0; --j) {
                    if (board[j][currentCoordinates[0]] === "#") {
                        break;
                    } else if (board[j][currentCoordinates[0]] === ".") {
                        currentCoordinates[1] = j;
                        break;
                    }
                }
            } else {
                // if it's a hash
                break;
            }
            continue;
        }
    }
}

module.exports = { day22Task1 };
