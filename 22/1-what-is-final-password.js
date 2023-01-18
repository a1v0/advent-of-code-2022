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
        move(instruction);
    }

    function move(instruction) {
        const directionValue =
            direction < 0 && direction % 4 != 0
                ? (direction % 4) + 4
                : Math.abs(direction % 4);

        // this code is very repetitive. I'd love to know how to reduce that
        for (let i = 0; i < instruction; ++i) {
            // going right
            if (directionValue === 0) {
                if (
                    currentCoordinates[0] + 1 >=
                        board[currentCoordinates[1]].length ||
                    board[currentCoordinates[1]][currentCoordinates[0] + 1] ===
                        " "
                ) {
                    // if it's undefined or a space, do a wrap, provided there's not # on the other side
                    if (
                        // indexOf returns -1 if it's not included, so need to check if it exists
                        !board[currentCoordinates[1]].includes("#") ||
                        board[currentCoordinates[1]].indexOf(".") <
                            board[currentCoordinates[1]].indexOf("#")
                    ) {
                        currentCoordinates[0] =
                            board[currentCoordinates[1]].indexOf(".");
                    }
                } else if (
                    board[currentCoordinates[1]][currentCoordinates[0] + 1] ===
                    "."
                ) {
                    // if it's a valid move
                    ++currentCoordinates[0];
                } else {
                    // if it's a hash
                    break;
                }
            }

            // going left
            else if (directionValue === 2) {
                if (
                    currentCoordinates[0] - 1 < 0 ||
                    board[currentCoordinates[1]][currentCoordinates[0] - 1] ===
                        " "
                ) {
                    // if it's undefined or a space, do a wrap, provided there's not # on the other side
                    if (
                        board[currentCoordinates[1]].lastIndexOf(".") >
                        board[currentCoordinates[1]].lastIndexOf("#")
                    ) {
                        currentCoordinates[0] =
                            board[currentCoordinates[1]].lastIndexOf(".");
                    }
                } else if (
                    board[currentCoordinates[1]][currentCoordinates[0] - 1] ===
                    "."
                ) {
                    // if it's a valid move
                    --currentCoordinates[0];
                } else {
                    // if it's a hash
                    break;
                }
            }

            // going down
            else if (directionValue === 1) {
                if (
                    currentCoordinates[1] + 1 >= board.length ||
                    board[currentCoordinates[1] + 1][currentCoordinates[0]] ===
                        " " ||
                    board[currentCoordinates[1] + 1][currentCoordinates[0]] ===
                        undefined
                ) {
                    for (let j = 0; j < board.length; ++j) {
                        if (board[j][currentCoordinates[0]] === "#") {
                            break;
                        }
                        if (board[j][currentCoordinates[0]] === ".") {
                            currentCoordinates[1] = j;
                            break;
                        }
                    }
                } else if (
                    board[currentCoordinates[1] + 1][currentCoordinates[0]] ===
                    "."
                ) {
                    // if it's a valid move
                    ++currentCoordinates[1];
                } else {
                    // if it's a hash
                    break;
                }
            }

            // going up
            else if (directionValue === 3) {
                if (
                    currentCoordinates[1] - 1 < 0 ||
                    board[currentCoordinates[1] - 1][currentCoordinates[0]] ===
                        " "
                ) {
                    for (let j = board.length - 1; j >= 0; --j) {
                        if (board[j][currentCoordinates[0]] === "#") {
                            break;
                        }
                        if (board[j][currentCoordinates[0]] === ".") {
                            currentCoordinates[1] = j;
                            break;
                        }
                    }
                } else if (
                    board[currentCoordinates[1] - 1][currentCoordinates[0]] ===
                    "."
                ) {
                    // if it's a valid move
                    --currentCoordinates[1];
                } else {
                    // if it's a hash
                    break;
                }
            }
        }
    }

    const multipliedRow = (currentCoordinates[1] + 1) * 1000, // + 1 because rows in the task aren't zero-indexed
        multipliedColumn = (currentCoordinates[0] + 1) * 4, // + 1 because columns in the task aren't zero-indexed
        directionValue = Math.abs(direction % 4);
    console.log(currentCoordinates, direction, directionValue);
    return multipliedRow + multipliedColumn + directionValue;
}

console.log(day22Task1(input)); // 192096, 103356 are wrong
module.exports = { day22Task1 };
