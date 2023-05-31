// This is the same code as in the first task, except that I do not reverse the spliced array before adding it to the stack

const { stacks, moves: movesString } = require("./input.js");

const moveStrings = movesString.split("\n");
const moves = moveStrings.map((moveString) => {
    const numbers = moveString.match(/\d+/g);
    return { quantity: numbers[0], from: numbers[1], to: numbers[2] };
});

moves.forEach((move) => {
    const removedElements = stacks[move.from - 1].splice(0, move.quantity);
    stacks[move.to - 1].splice(0, 0, ...removedElements);
});

let firstItems = "";
stacks.forEach((stack) => {
    firstItems += stack[0];
});

console.log(firstItems);
