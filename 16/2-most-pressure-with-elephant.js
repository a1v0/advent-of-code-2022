const { input } = require("./input");
const { importedDistancesBetweenAllValves } = require("./shortest-distances");

//
// availableValves is object, not set
// - valve can be set to "available" if it's not being headed towards and it's not open
// - "reserved" if it's closed but being headed towards
// - "open" if open
// add a parameter to store person's and elephant's routes. this may help debugging
//- { person: [], elephant: [] }
//
//
//
//
//
//
// logical flow:
// - if > max_minutes:
//   - update max flow
//   - return
// - if no available routes:
//   - pad route until end
//   - return
// - if just one route:
// ============ MADE IT HERE =================
//   - if person can go, send person down it
//     - DON'T return
//   - if elephant can go, send person down it
//   - return
// - if neither elephant, nor person can go anywhere:
//   - invoke method, reducing the waiting time
//   - return
// - for each valve
//   - if both can go:
//     - for each valve:
//       - if inner valve === outer valve, continue
//       - send elephant to outer valve and person to inner
//       - return
//   - if person can go, loop through valves and send person
//   - if elephant can go, loop through valves and send person
//
//
//
//
//
//
//
//
// methods:
// - if no available valves exist:
//   - pad out route until end (or just a version of the below)
//   - pad route if person and/or elephant are still on their way somewhere
//     - once route is ended, call the main method again, so that there's just one endpoint (the guard clause)
// - update max flowrate
// - method to update values and send BOTH down the main method
// - method to update values and send just one down the main method
//
//
//
//
//
//

/**
 *
 * This is an incredibly messy solution in desperate need of a major refactor
 *
 * Refactoring plan:
 * - make list of all cases which the code is trying to cover
 * - look for similarities and see if any logic can be extracted to separate methods
 *
 */

const MAX_MINUTES = 26;
let maxFlowRate = 0; // I know it'd be better to use an array for this, but this might make memory management easier
let distancesBetweenAllValves, allValves; // Not a very elegant solution, but making these global reduces the number of parameters

function day16Task2(input, scopedDistancesBetweenAllValves) {
    const inputByLine = input.split("\n");
    const scopedAllValves = inputByLine.reduce(parseInput, {});
    const worthwhileValves = {};
    for (let valve in scopedAllValves) {
        if (scopedAllValves[valve].flowRate > 0) {
            worthwhileValves[valve] = true;
        }
    }

    distancesBetweenAllValves = scopedDistancesBetweenAllValves;
    allValves = scopedAllValves;

    const person = { currentLocation: "AA", timeBeforeNextMove: 0 },
        elephant = { currentLocation: "AA", timeBeforeNextMove: 0 };

    const routes = { person: [], elephant: [] };

    evaluateRoutesRecursively(
        person,
        elephant,
        routes,
        0,
        0,
        0,
        worthwhileValves
    );

    return maxFlowRate;
}

function evaluateRoutesRecursively(
    person,
    elephant,
    routes,
    currentMinute,
    flowRate,
    totalFlow,
    worthwhileValves
) {
    if (currentMinute > MAX_MINUTES) {
        updateHighestFlowRate(totalFlow, routes);
        return;
    }

    const amountOfWorthwhileValves = worthwhileValves.reduce(
        countAvailableValves,
        0
    );
    if (!amountOfWorthwhileValves) {
        // update flowrate(s) if one or both participants are able
        let newFlowRate = flowRate;
        if (
            !person.timeBeforeNextMove &&
            worthwhileValves[person.currentLocation] === "reserved"
        ) {
            newFlowRate += allValves[person.currentLocation].flowRate;
            delete worthwhileValves[person.currentLocation];
            routes.person.push(person.currentLocation);
        }
        if (
            !elephant.timeBeforeNextMove &&
            worthwhileValves[elephant.currentLocation] === "reserved"
        ) {
            newFlowRate += allValves[elephant.currentLocation].flowRate;
            delete worthwhileValves[elephant.currentLocation];
            routes.elephant.push(elephant.currentLocation);
        }

        if (elephant.timeBeforeNextMove > 0 || person.timeBeforeNextMove > 0) {
            const newPerson = { ...person },
                newElephant = { ...elephant };
            if (newPerson.timeBeforeNextMove > 0) {
                --newPerson.timeBeforeNextMove;
            }
            if (newElephant.timeBeforeNextMove > 0) {
                --newElephant.timeBeforeNextMove;
            }
            evaluateRoutesRecursively(
                newPerson,
                newElephant,
                routes,
                currentMinute + 1,
                newFlowRate,
                totalFlow + flowRate,
                worthwhileValves
            );
            return;
        }

        const newTotalFlow = padRouteUntilEnd(
            currentMinute,
            newFlowRate,
            totalFlow
        );

        evaluateRoutesRecursively(
            person,
            elephant,
            routes,
            27,
            newFlowRate,
            newTotalFlow,
            {}
        );
        return;
    }
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
    //
    //
    //
    //
    //
    //
    //
    //
    //
    // this section needs completing
    //
    //
    if (amountOfWorthwhileValves === 1) {
        for (let availableValve in worthwhileValves) {
            if (!person.timeBeforeNextMove) {
            }
            if (!elephant.timeBeforeNextMove) {
            }
        }
        return;
    }
    //
    //
    //
    //
    //
    //
    //
    //
}

function countAvailableValves(accumulator, valve) {
    if (valve === "available") {
        return accumulator + 1;
    }
}

function padRouteUntilEnd(currentMinute, flowRate, totalFlow) {
    let newTotalFlow = totalFlow;

    while (currentMinute <= MAX_MINUTES) {
        newTotalFlow += flowRate;
        ++currentMinute;
    }

    return newTotalFlow;
}

function updateHighestFlowRate(flow, routes) {
    if (flow > maxFlowRate) {
        maxFlowRate = flow;
        console.log(maxFlowRate, "\n", routes);
    }
}

function parseInput(valves, valveString) {
    const valve = {};
    const valveNameRegex = /[A-Z]{2}/,
        flowRateRegex = /\d+/,
        leadsToRegex = /[A-Z]{2}/g;

    const [firstHalf, secondHalf] = valveString.split("; ");
    const name = firstHalf.match(valveNameRegex)[0],
        flowRate = Number(firstHalf.match(flowRateRegex)[0]),
        leadsTo = secondHalf.match(leadsToRegex);

    valve.flowRate = flowRate;
    valve.leadsTo = leadsTo;
    valves[name] = valve;

    return valves;
}

// console.log(day16Task2(input, importedDistancesBetweenAllValves));
module.exports = { day16Task2 };
