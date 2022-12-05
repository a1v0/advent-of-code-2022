const { stacks, moves: movesString } = require("./input.js");

// split moves into array of objects { quantity: x, from: y, to: z }
const moveStrings = movesString.split("\n");
const moves = moveStrings.map((moveString) => {
    const numbers = moveString.match(/\d+/g);
    return { quantity: numbers[0], from: numbers[1], to: numbers[2] };
});

// loop through moves array, creating a slice/splice (whichever one it is) based on the command
moves.forEach((move) => {
    const removedElements = stacks[move.from - 1].splice(0, move.quantity);
    stacks[move.to - 1].splice(0, 0, ...removedElements.reverse());
});

// loop through stacks, creating a string of [0] of each stack
let firstItems = "";
stacks.forEach((stack) => {
    firstItems += stack[0];
});

console.log(firstItems);
