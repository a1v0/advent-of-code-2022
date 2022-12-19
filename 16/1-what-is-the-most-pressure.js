const { testInput: input } = require("./input");

// split input into rows
const valvesStrings = input.split("\n");

// map rows into objects: { id: "AA", flowRate: Number, isFlowing: false, leadsTo: ["BB", ...] }
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

let currentValveID = "AA";
let totalFlow = 0;
let clock = 0;

while (clock < 30) {
    // identify next stop
    const potentialNextStops = [];
    valves.forEach((targetValve) => {
        if (!targetValve.isFlowing) {
            potentialNextStops.push(findNextValve(currentValveID, targetValve));
        }
    });

    potentialNextStops.sort((a, b) => {
        return b.heuristic - a.heuristic;
    });

    const nextStop = potentialNextStops[0];

    // update current valve, clock and flow
    currentValveID = nextStop.id;

    const timeFactor =
        clock + nextStop.distance <= 30 ? nextStop.distance : 30 - clock;
    clock += timeFactor; // the distance already factors in the extra minute to switch on a valve
    totalFlow += getCurrentFlow() * timeFactor; // retrospectively calculates flow rate based on number of minutes
    console.log(currentValveID, 30 - clock);

    // update flowing status and sort valves
    getValve(currentValveID).isFlowing = true; // this must be set to true AFTER the flow has been calculated
    sortValves();
}

// recursively go through all routes to find target valve
function findNextValve(currentValveID, targetValve) {
    const routes = [];
    const currentRoute = [currentValveID];

    const currentValve = getValve(currentValveID);
    evaluateOptions(currentValve.leadsTo, currentRoute);

    function evaluateOptions(pathOptions, currentRoute) {
        //
        //
        // perhaps add a limiter here to stop looking if the current route is too long to bother continuing with
        //
        //
        if (currentRoute.includes(targetValve.id)) {
            routes.push(currentRoute);
        } else {
            pathOptions.forEach((pathOption) => {
                if (!currentRoute.includes(pathOption)) {
                    const currentValve = getValve(pathOption);
                    evaluateOptions(currentValve.leadsTo, [
                        ...currentRoute,
                        pathOption
                    ]);
                }
            });
        }
    }
    routes.sort((a, b) => {
        // in theory it won't matter if they're both the same length
        return a.length - b.length;
    });
    const timeLeftAfterSwitchingOn = 30 - routes[0].length;

    return {
        id: targetValve.id,
        distance: routes[0].length,
        heuristic: timeLeftAfterSwitchingOn * targetValve.flowRate
    };
}

console.log(valves);
console.log(totalFlow);
