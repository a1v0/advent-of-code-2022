const { testInput: input } = require("./input");

// split input into rows
const valvesStrings = input.split("\n");

// map rows into objects: { id: "AA", flowRate: Number, isFlowing: false, flowingSince: undefined, leadsTo: ["BB", ...] }
const valves = valvesStrings.map((valveString) => {
    const valve = {};
    const letters = valveString.match(/[A-Z]{2}/g);
    valve.id = letters.shift();
    valve.leadsTo = [...letters];
    valve.flowRate = Number(valveString.match(/(?<=rate=)[0-9]+/g)[0]);
    valve.isFlowing = false;
    return valve;
});

// create sort callback function, to put all flowing valves at the end of the array, and otherwise sort valves by flow rate (descending)
function sortValves() {
    valves.sort((a, b) => {
        if (a.isFlowing) return 1;
        if (b.isFlowing) return -1;
        return b.flowRate - a.flowRate;
    });
}
sortValves();

console.log(valves);

// calculate current flow
function getCurrentFlow() {
    let currentFlow = 0;
    valves.forEach(({ isFlowing, flowRate }) => {
        if (isFlowing) {
            currentFlow += flowRate;
        }
    });
    return currentFlow;
}

// get specific valve
function getValve(valveID) {
    return valves.find(({ id }) => {
        return id === valveID;
    });
}

let currentValve = "AA";
let totalFlow = 0;
let clock = 0;

while (clock <= 30) {
    // identify next stop
    const nextStop = findNextValve(currentValve);

    // update current valve, clock and flow
    currentValve = nextStop.valve;
    clock += nextStop.distance + 1; // +1 to account for switching on the valve
    totalFlow += getCurrentFlow() * (nextStop.distance + 1);

    // update flowing status and sort valves
    getValve(currentValve).isFlowing = true; // this must be set to true AFTER the flow has been calculated
    sortValves();
}

function findNextValve(currentValve) {
    // recursively or otherwise, go through all valves, in descending order of flowRate
    // find how many steps it would take to get to the highest-flow valve, and subtract this from the valve's flow
    // e.g. valve's flow is 20, and it takes 7 steps to get there, so total score is 20 - 7 = 13
    // go to the valve with the highest score, returing it as { valve: "AA", distance: Number }

    return { valve: "AA", distance: Number };
}

console.log(totalFlow);
