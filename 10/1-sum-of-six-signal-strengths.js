const { input } = require("./input");

const commandsStrings = input.split("\n");

// map commands into array that resembles clock cycles (i.e. each addx takes up two spaces)
const commandsInClock = [0]; // the initial 0 makes the number of each clock cycle match the index of the array

commandsStrings.forEach((commandsString) => {
    if (commandsString === "noop") commandsInClock.push(0);
    else {
        commandsInClock.push(0, Number(commandsString.replace("addx ", "")));
    }
});

let x = 1;
const interestingSignals = [];

// loop through clock, mapping X value along the way, and inputting interesting values into array
for (let i = 0; i < commandsInClock.length; ++i) {
    if ((i + 20) % 40 === 0) {
        interestingSignals.push(i * x);
    }
    x += commandsInClock[i];
}

const totalInterestingSignals = interestingSignals.reduce(
    (accumulator, currentInterestingSignal) => {
        return accumulator + currentInterestingSignal;
    },
    0
);

console.log(totalInterestingSignals);
