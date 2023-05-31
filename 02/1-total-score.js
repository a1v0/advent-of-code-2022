const { input } = require("./input.js");

// convert XYZ into ABC for ease of comparison
let allABCs = input;
allABCs = allABCs.replaceAll("X", "A");
allABCs = allABCs.replaceAll("Y", "B");
allABCs = allABCs.replaceAll("Z", "C");

const roundsStrings = allABCs.split("\n");
const rounds = roundsStrings.map((roundString) => {
    return roundString.split(" ");
});

let wins = 0,
    losses = 0,
    draws = 0;

const attackMethods = rounds.map((round) => {
    const elfAttack = round[0];
    const myAttack = round[1];
    
    switch (true) {
        case elfAttack === "A" && myAttack === "B":
        case elfAttack === "B" && myAttack === "C":
        case elfAttack === "C" && myAttack === "A":
            ++wins;
            break;
        case elfAttack === myAttack:
            ++draws;
            break;
        default:
            ++losses;
            break;
    }
    
    return myAttack;
});

let totalScore = 0;

totalScore += wins * 6;
totalScore += losses * 0;
totalScore += draws * 3;

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
