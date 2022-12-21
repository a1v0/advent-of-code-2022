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

// // create sort callback function, to put all flowing valves at the end of the array, and otherwise sort valves by flow rate (descending)
// function sortValves() {
//     valves.sort((a, b) => {
//         if (a.isFlowing) return 1;
//         if (b.isFlowing) return -1;
//         return b.flowRate - a.flowRate;
//     });
// }
// sortValves();

// // calculate current flow
// function getCurrentFlow() {
//     let currentFlow = 0;
//     valves.forEach(({ isFlowing, flowRate }) => {
//         if (isFlowing) {
//             currentFlow += flowRate;
//         }
//     });
//     return currentFlow;
// }

// create function to return reference to specific valve
function getValve(valves, valveID) {
    return valves.find(({ id }) => {
        return id === valveID;
    });
}

// let currentValveID = "AA";
// let totalFlow = 0;
// let clock = 0;

// while (clock < 30) {
//     // identify next stop
//     const potentialNextStops = [];
//     valves.forEach((targetValve) => {
//         if (!targetValve.isFlowing) {
//             potentialNextStops.push(findNextValve(currentValveID, targetValve));
//         }
//     });

//     potentialNextStops.sort((a, b) => {
//         return b.heuristic - a.heuristic;
//     });

//     const nextStop = potentialNextStops[0];

//     // update current valve, clock and flow
//     currentValveID = nextStop.id;

//     const timeFactor =
//         clock + nextStop.distance <= 30 ? nextStop.distance : 30 - clock;
//     clock += timeFactor; // the distance already factors in the extra minute to switch on a valve
//     totalFlow += getCurrentFlow() * timeFactor; // retrospectively calculates flow rate based on number of minutes
//     // console.log(currentValveID, 30 - clock);

//     // update flowing status and sort valves
//     getValve(valves, currentValveID).isFlowing = true; // this must be set to true AFTER the flow has been calculated
//     sortValves();
// }

// recursively go through all routes to find target valve
function findNextValve(currentValveID, targetValve) {
    const routes = [];
    const currentRoute = [currentValveID];

    const currentValve = getValve(valves, currentValveID);
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
                    const currentValve = getValve(valves, pathOption);
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

// // console.log(valves);
// // console.log(totalFlow);

// create array showing only nodes whose flowRate > 0
const worthyDestinations = valves.filter((valve) => {
    return valve.flowRate > 0;
});

// create array of valves (easier to do than making a proper graph) to list the distance from any valve to any of the good valves
const valveReferenceTable = [];

valves.forEach((valve) => {
    worthyDestinations.forEach((targetValve) => {
        if (targetValve.id !== valve.id) {
            const referenceObject = findNextValve(valve.id, targetValve);
            delete referenceObject.heuristic;
            referenceObject.to = referenceObject.id;
            delete referenceObject.id;
            referenceObject.from = valve.id;
            valveReferenceTable.push(referenceObject);
        }
    });
});
// console.log(valveReferenceTable);

// create a function to make a deep copy of valves
function deepCopyValves(valves) {
    return valves.map((valve) => {
        return { ...valve };
    });
}

// create a routes array to store all conceivable routes (routes look like { clock: Number, route: [], valves: [...valves, showing all flowing ones] })
let routes = [
    {
        clock: 0,
        route: ["AA"],
        valves: deepCopyValves(valves),
        totalFlow: 0,
        flowRate: 0
    }
];

// create a while loop that loops until routes[0] is 30 minutes long (using Dijkstra, this should theoretically be the best route)
let i = 0;
while (routes[0].clock < 30) {
    const newRoutes = [];
    for (let route of routes) {
        // console.log(newRoutes.length);
        if (route.clock === 30) {
            console.log(route);
            break;
        }
        if (route.clock < 30) {
            // console.log(route.clock, "time");
            // start at last node in route and loop through all possible worthyDestinations from that point, going into each one that isn't currently flowing
            const pathOptions = valveReferenceTable.filter((valve) => {
                return valve.from === route.route[route.route.length - 1];
            });

            // console.log(pathOptions.length, "POs");
            pathOptions.forEach((pathOption) => {
                const destinationValve = getValve(route.valves, pathOption.to);
                console.log(destinationValve);
                if (!destinationValve.isFlowing) {
                    const newValves = deepCopyValves(route.valves);
                    const newDestinationValve = getValve(
                        newValves,
                        pathOption.to
                    );
                    newDestinationValve.isFlowing = true;
                    const newRoute = {
                        clock: route.clock + pathOption.distance,
                        route: [...route.route, pathOption.to],
                        valves: newValves,
                        totalFlow: route.flowRate * pathOption.distance,
                        flowRate: route.flowRate + destinationValve.flowRate
                    };
                    newRoutes.push(newRoute);
                } else {
                    // add a single minute to the clock
                    const newRoute = {
                        clock: route.clock + 1,
                        route: [...route.route],
                        valves: deepCopyValves(route.valves),
                        totalFlow: route.totalFlow + route.flowRate,
                        flowRate: route.flowRate
                    };
                    newRoutes.push(newRoute);
                }
            });
        }
    }
    routes = [...newRoutes];
}
const routesAt30 = routes.filter((route) => {
    return route.clock <= 30;
});
routesAt30.sort((a, b) => {
    return a.totalFlow - b.totalFlow;
});
console.log(routesAt30);
// switch on every destination valve and add the time taken
// sort routes array (how?)
// if sorting isn't possible, I'll have to go back to some sort of brute-force method where I check through virtually every route

// checks to do:
// - if current time is 30, don't do anything
// - if I can't go anywhere before my time is up => add currentFlowRate * remaining minutes to total and return
// - if all good valves are open => add currentFlowRate * remaining minutes to total and return
