const { input } = require("./input");
const { distancesBetweenAllValves } = require("./shortest-distances");

const MAX_MINUTES = 26;
let maxFlowRate = 0; // I know it'd be better to use an array for this, but this might make memory management easier

function day16Task2(input, distancesBetweenAllValves) {
    const inputByLine = input.split("\n");
    const valves = inputByLine.reduce(parseInput, {});
    const worthwhileValves = new Set();
    for (let valve in valves) {
        if (valves[valve].flowRate > 0) {
            worthwhileValves.add(valve);
        }
    }
    // this will be trickier, methinks, because i need to keep track of two sets of minutes
    // could call my recursive method once every minute
    // add a parameter to the method about time left until Person A and B can go somewhere else
    // // if Person B needs to take five minutes to get to a location, keep track of that
    // // if PErson B's 'timer' is 0, then you can turn on the valve and move on
    // it might make a difference whether Person A is evaluated before PErson B, so we may need to add in another check

    const person = { currentLocation: "AA", timeBeforeNextMove: 0 },
        elephant = { currentLocation: "AA", timeBeforeNextMove: 0 };

    evaluateRoutesRecursively(
        person,
        elephant,
        0,
        0,
        0,
        worthwhileValves,
        valves,
        distancesBetweenAllValves
    );

    return maxFlowRate;
}

function evaluateRoutesRecursively(
    person,
    elephant,
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

    if (!person.timeBeforeNextMove && !elephant.timeBeforeNextMove) {
        //     availableValves.forEach((personValve)=>{
        // availableValves.forEach((elephantValve)=>{
        //     if(personValve===elephantValve) return;
        // })
        // })
    } else if (!person.timeBeforeNextMove) {
        // send elephant to new route
    } else if (!elephant.timeBeforeNextMove) {
        // send person down a route
    } else {
        // continue but with a reduced no of minutes
    }

    // for each available route
    // nested for each
    // send elephant everywhere in the nest (except the current external valve)
    // this should cover every single combo
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

// console.log(day16Task2(input, distancesBetweenAllValves));
module.exports = { day16Task2 };
