const { input } = require("../22/input");

function day22Task1(input) {
    const instructionsStringRegex = /\w+/;
    const instructionsString = input.match(instructionsStringRegex)[0];
    const instructionsRegex = /\d+|\D/g;
    const instructions = instructionsString
        .match(instructionsRegex)
        .map((instruction) => {
            if (!isNaN(Number(instruction))) {
                return Number(instruction);
            }
            return instruction;
        });

    const boardStringRegex = /^[\s\#\.]+(?=\n\n)/;
    const boardString = input.match(boardStringRegex)[0];

    const board = [];
    const boardRows = boardString.split("\n");
    boardRows.forEach((boardRow) => {
        board.push(boardRow.split(""));
    });

    const startingX = board[0].indexOf(".");
    const currentCoordinates = [startingX, 0];

    let direction = 0; // value % 4 defines direction (right: 0, down: 1, left: 2, up: 3)

    for (let instruction of instructions) {
        if (isNaN(instruction)) {
            direction += instruction === "L" ? -1 : 1;
            continue;
        }

        move(instruction, direction, currentCoordinates, board);
    }

    const multipliedRow = (currentCoordinates[1] + 1) * 1000, // + 1 because rows in the task aren't zero-indexed
        multipliedColumn = (currentCoordinates[0] + 1) * 4, // + 1 because columns in the task aren't zero-indexed
        directionValue =
            direction < 0 && direction % 4 != 0
                ? (direction % 4) + 4
                : Math.abs(direction % 4);
    return multipliedRow + multipliedColumn + directionValue;
}

console.log(day22Task1(input));

function move(instruction, direction, currentCoordinates, board) {
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
                board[currentCoordinates[1]][currentCoordinates[0] + 1] === " "
            ) {
                // if it's undefined or a space, do a wrap, provided it's not # on the other side
                if (
                    !board[currentCoordinates[1]].includes("#") ||
                    board[currentCoordinates[1]].indexOf(".") <
                        board[currentCoordinates[1]].indexOf("#")
                ) {
                    currentCoordinates[0] =
                        board[currentCoordinates[1]].indexOf(".");
                }
            } else if (
                board[currentCoordinates[1]][currentCoordinates[0] + 1] === "."
            ) {
                ++currentCoordinates[0];
            } else {
                break;
            }
        }

        // going left
        else if (directionValue === 2) {
            if (
                currentCoordinates[0] - 1 < 0 ||
                board[currentCoordinates[1]][currentCoordinates[0] - 1] === " "
            ) {
                // if it's undefined or a space, do a wrap, provided it's not # on the other side
                if (
                    board[currentCoordinates[1]].lastIndexOf(".") >
                    board[currentCoordinates[1]].lastIndexOf("#")
                ) {
                    currentCoordinates[0] =
                        board[currentCoordinates[1]].lastIndexOf(".");
                }
            } else if (
                board[currentCoordinates[1]][currentCoordinates[0] - 1] === "."
            ) {
                --currentCoordinates[0];
            } else {
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
                board[currentCoordinates[1] + 1][currentCoordinates[0]] === "."
            ) {
                ++currentCoordinates[1];
            } else {
                break;
            }
        }

        // going up
        else if (directionValue === 3) {
            if (
                currentCoordinates[1] - 1 < 0 ||
                board[currentCoordinates[1] - 1][currentCoordinates[0]] === " "
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
                board[currentCoordinates[1] - 1][currentCoordinates[0]] === "."
            ) {
                --currentCoordinates[1];
            } else {
                break;
            }
        }
    }
}

module.exports = { day22Task1 };
