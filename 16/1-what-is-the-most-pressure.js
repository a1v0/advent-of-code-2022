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
function sortValves(a, b) {
    if (a.isFlowing) return 1;
    if (b.isFlowing) return -1;
    return b.flowRate - a.flowRate;
}

valves.sort(sortValves);
console.log(valves);

// calculate current flow
function findFlowRate() {
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

// create function to find shortest path from current object to first object in sorted array
// // turn on valve once you reach it
// // sort array (this can be done elsewhere in the code, too)
// start at AA

//
//
//
//
//
//
//
//
//
//
//
//

// find shortest way from AA to largest valve
// look for next best path (a path whose flowRate-distance is highest), so long as we've never been there before
// find shortest way from largest valve to next largest etc. (find a way to prevent going to places that have already been visited)
