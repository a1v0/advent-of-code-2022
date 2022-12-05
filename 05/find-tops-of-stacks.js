const { stacks, moves: movesString } = require("./input.js");

// split moves into array of objects { move: x, from: y, to: z }
const moveStrings = movesString.split("\n");
const moves = moveStrings.map((moveString) => {
    const numbers = moveString.match(/\d+/g);
    return { move: numbers[0], from: numbers[1], to: numbers[2] };
});

console.log(moves);

// loop through moves array, creating a slice/splice (whichever one it is) based on the command
// loop through stacks, creating a string of [0] of each stack
