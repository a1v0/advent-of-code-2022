const { input } = require("./input.js");

const roundsStrings = input.split("\n");
const rounds = roundsStrings.map((roundString) => {
    return roundString.split(" ");
});
console.log(rounds);

let wins = 0,
    losses = 0,
    draws = 0;
const attackMethods = [];

rounds.forEach((round) => {
    const elfAttack = round[0];
    const outcome = round[1];

    // count wins/losses/draws
    if (outcome === "X") {
        ++losses;
    } else if (outcome === "Y") {
        ++draws;
    } else if (outcome === "Z") {
        ++wins;
    }

    attackMethods.push(findMethod(elfAttack, outcome));
});

function findMethod(attack, outcome) {
    if (outcome === "Y") return attack;
    if (outcome === "X") {
        if (attack === "A") return "C";
        if (attack === "B") return "A";
        if (attack === "C") return "B";
    }
    if (outcome === "Z") {
        if (attack === "A") return "B";
        if (attack === "B") return "C";
        if (attack === "C") return "A";
    }
}

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
