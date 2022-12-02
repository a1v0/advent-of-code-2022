const { input } = require("./input.js");

// convert XYZ into ABC for ease of comparison
let allABCs = input;
allABCs = allABCs.replace(/X/g, "A");
allABCs = allABCs.replace(/Y/g, "B");
allABCs = allABCs.replace(/Z/g, "C");

// split input into individual rounds
const roundsStrings = allABCs.split("\n");
const rounds = roundsStrings.map((roundString) => {
    return roundString.split(" ");
});

// create three variables for wins, losses and draws, and an array to store methods of attack
let wins = 0,
    losses = 0,
    draws = 0;
const attackMethods = [];

// loop through array of games. If it's a draw, for example, add my attack to the draws array
rounds.forEach((round) => {
    const elfAttack = round[0];
    const myAttack = round[1];
    if (
        (elfAttack === "A" && myAttack === "B") ||
        (elfAttack === "B" && myAttack === "C") ||
        (elfAttack === "C" && myAttack === "A")
    ) {
        ++wins;
    } else if (elfAttack === myAttack) {
        ++draws;
    } else {
        ++losses;
    }
    attackMethods.push(myAttack);
});

// create total score variable
let totalScore = 0;

// add points for wins/draws/losses
totalScore += wins * 6;
totalScore += losses * 0;
totalScore += draws * 3;

// add points for types of method
attackMethods.forEach((attackMethod) => {
    if (attackMethod === "A") {
        totalScore += 1;
    } else if (attackMethod === "B") {
        totalScore += 2;
    } else if (attackMethod === "C") {
        totalScore += 3;
    }
});

console.log(totalScore);

// it's not efficient, but it'll keep the code clean. I may refactor it
