const { input } = require("./input");
const { distancesBetweenAllValves } = require("../16/shortest-distances");

const MAX_MINUTES = 30;
let maxFlowRate = 0; // I know it'd be better to use an array for this, but this might make memory management easier

function day16Task1(input, distancesBetweenAllValves) {
    /**
     *
     * const distancesBetweenAllValves = findShortestDistancesBetweenAllValves(valves);
     * I wrote the output of this to a file to save time, because it takes ages to calculate
     */

    const inputByLine = input.split("\n");
    const valves = inputByLine.reduce(parseInput, {});
    const worthwhileValves = new Set();
    for (let valve in valves) {
        if (valves[valve].flowRate > 0) {
            worthwhileValves.add(valve);
        }
    }

    evaluateRoutesWithBacktracking(
        "AA",
        0,
        0,
        0,
        worthwhileValves,
        valves,
        distancesBetweenAllValves
    );

    return maxFlowRate;
}

function evaluateRoutesWithBacktracking(
    currentLocation,
    currentMinute,
    flowRate,
    totalFlow,
    availableValves,
    allValves,
    distancesBetweenAllValves
) {
    if (currentMinute > MAX_MINUTES) {
        updateHighestFlowRate(totalFlow);
        return;
    }

    if (!availableValves.size) {
        padRouteUntilLastMinute(currentMinute, totalFlow, flowRate);
        return;
    }

    availableValves.forEach((valve) => {
        const minutesAdded =
            distancesBetweenAllValves[currentLocation + valve] + 1; // +1 because it takes a minute to open the valve

        if (currentMinute + minutesAdded > MAX_MINUTES) {
            padRouteUntilLastMinute(currentMinute, totalFlow, flowRate);
            return;
        }

        const newMinute = currentMinute + minutesAdded,
            newTotalFlow = totalFlow + flowRate * minutesAdded,
            newFlowRate = flowRate + allValves[valve].flowRate;

        const newAvailableValves = new Set(availableValves);
        newAvailableValves.delete(valve);

        evaluateRoutesWithBacktracking(
            valve,
            newMinute,
            newFlowRate,
            newTotalFlow,
            newAvailableValves,
            allValves,
            distancesBetweenAllValves
        );
    });
}

function updateHighestFlowRate(flow) {
    if (flow > maxFlowRate) {
        maxFlowRate = flow;
        console.log(maxFlowRate);
    }
}

function padRouteUntilLastMinute(currentMinute, totalFlow, flowRate) {
    const remainingMinutes = MAX_MINUTES - currentMinute;
    const remainingFlow = flowRate * remainingMinutes;
    const finalTotalFlow = totalFlow + remainingFlow;
    updateHighestFlowRate(finalTotalFlow);
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

// ------------------------------------------------------

/**
 * Utils for finding shortest distances between valves
 */
function findShortestDistancesBetweenAllValves(valves) {
    const routeLengths = {};
    for (let startValve in valves) {
        console.log("Evaluating new valve.");
        for (let destinationValve in valves) {
            if (destinationValve === startValve) continue;
            routeLengths[startValve + destinationValve] =
                calculateShortestDistanceToValve(
                    startValve,
                    destinationValve,
                    valves
                );
        }
    }
    return routeLengths;
}

function calculateShortestDistanceToValve(start, destination, valves) {
    const minutes = [];
    const newRoute = {
        currentLocation: start,
        minutesElapsed: 0,
        visitedValves: [],
        destination,
        valves,
        minutes
    };
    findShortestRouteRecursively(newRoute);
    return Math.min(...minutes);
}

function findShortestRouteRecursively({
    currentLocation,
    minutesElapsed,
    visitedValves,
    destination,
    valves,
    minutes
}) {
    if (minutesElapsed > MAX_MINUTES) return;
    if (currentLocation === destination) {
        minutes.push(minutesElapsed);
        return;
    }

    for (let valve of valves[currentLocation].leadsTo) {
        if (visitedValves.includes(valve)) continue;

        const newRoute = {
            currentLocation: valve,
            minutesElapsed: minutesElapsed + 1,
            visitedValves: [...visitedValves, valve],
            destination,
            valves,
            minutes
        };

        findShortestRouteRecursively(newRoute);
    }
}

// console.log(day16Task1(input, distancesBetweenAllValves));
module.exports = { day16Task1 };
