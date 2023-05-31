const { input } = require("./input.js");

const roundsStrings = input.split("\n");
const rounds = roundsStrings.map((roundString) => {
    return roundString.split(" ");
});

let wins = 0,
    losses = 0,
    draws = 0;

const attackMethods = rounds.map((round) => {
    const elfAttack = round[0];
    const outcome = round[1];

    switch (outcome) {
        case "X":
            ++losses;
            break;
        case "Y":
            ++draws;
            break;
        case "Z":
            ++wins;
            break;
        default:
            break;
    }

    return findMethod(elfAttack, outcome);
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
