const { input } = require("./input");

const commandsStrings = input.split("\n");

// map commands into array that resembles clock cycles (i.e. each addx takes up two spaces)
const commandsInClock = []; // the initial 0 makes the number of each clock cycle match the index of the array
commandsStrings.forEach((commandsString) => {
    if (commandsString === "noop") commandsInClock.push(0);
    else {
        commandsInClock.push(0, Number(commandsString.replace("addx ", "")));
    }
});

let x = 1;
let screen = "";

// loop through clock, mapping X value along the way, and inputting interesting values into array
for (let i = 1; i < commandsInClock.length; ++i) {
    const row = Math.floor(i / 40);
    const amountToSubtract = 40 * row;
    const j = i - amountToSubtract;

    if (j === x || j === x - 1 || j === x + 1) {
        screen += "#";
    } else {
        screen += ".";
    }

    x += commandsInClock[i + 1];

    if (i >= 39 && (i + 1) % 40 === 0) {
        screen += "\n";
    }
}

console.log(screen);
