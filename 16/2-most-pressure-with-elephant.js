const { input } = require("./input");
const { distancesBetweenAllValves } = require("./shortest-distances");

/**
 *
 * This is an incredibly messy solution in desperate need of a major refactor
 *
 */

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

    const person = {
            currentLocation: "AA",
            timeBeforeNextMove: 0
        },
        elephant = {
            currentLocation: "AA",
            timeBeforeNextMove: 0
        };

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

    if (!person.timeBeforeNextMove && !elephant.timeBeforeNextMove) {
        if (!availableValves.size) {
            padRouteUntilLastMinute(currentMinute, totalFlow, flowRate);
            return;
        }

        availableValves.forEach((personValve) => {
            availableValves.forEach((elephantValve) => {
                if (personValve === elephantValve) return;

                const newFlowRate =
                    flowRate +
                    allValves[elephant.currentLocation].flowRate +
                    allValves[person.currentLocation].flowRate;

                const newAvailableValves = new Set(availableValves);
                newAvailableValves.delete(personValve);
                newAvailableValves.delete(elephantValve);

                const newPerson = { ...person },
                    newElephant = { ...elephant };

                newPerson.timeBeforeNextMove =
                    distancesBetweenAllValves[
                        person.currentLocation + personValve
                    ] + 1; // +1 because it takes a minute to turn on the valve
                newPerson.currentLocation = personValve;

                newElephant.timeBeforeNextMove =
                    distancesBetweenAllValves[
                        elephant.currentLocation + elephantValve
                    ] + 1; // +1 because it takes a minute to turn on the valve
                newElephant.currentLocation = elephantValve;

                evaluateRoutesRecursively(
                    newPerson,
                    newElephant,
                    currentMinute + 1,
                    newFlowRate,
                    totalFlow + flowRate,
                    newAvailableValves,
                    allValves,
                    distancesBetweenAllValves
                );
            });
        });
        return;
    }

    if (!person.timeBeforeNextMove) {
        // send person down all available routes
        if (!availableValves.size) {
            const newFlowRate =
                flowRate + allValves[person.currentLocation].flowRate;

            const newAvailableValves = new Set();

            const newPerson = { ...person },
                newElephant = { ...elephant };

            --newElephant.timeBeforeNextMove;

            evaluateRoutesRecursively(
                newPerson,
                newElephant,
                currentMinute + 1,
                newFlowRate,
                totalFlow + flowRate,
                newAvailableValves,
                allValves,
                distancesBetweenAllValves
            );
            return;
        }

        availableValves.forEach((valve) => {
            const newFlowRate =
                flowRate + allValves[person.currentLocation].flowRate;

            const newAvailableValves = new Set(availableValves);
            newAvailableValves.delete(valve);

            const newPerson = { ...person },
                newElephant = { ...elephant };

            --newElephant.timeBeforeNextMove;

            newPerson.timeBeforeNextMove =
                distancesBetweenAllValves[person.currentLocation + valve] + 1; // +1 because it takes a minute to turn on the valve
            newPerson.currentLocation = valve;

            evaluateRoutesRecursively(
                newPerson,
                newElephant,
                currentMinute + 1,
                newFlowRate,
                totalFlow + flowRate,
                newAvailableValves,
                allValves,
                distancesBetweenAllValves
            );
        });
        return;
    }

    if (!elephant.timeBeforeNextMove) {
        // send elephant down all available routes
        if (!availableValves.size) {
            const newFlowRate =
                flowRate + allValves[elephant.currentLocation].flowRate;

            const newAvailableValves = new Set();

            const newPerson = { ...person },
                newElephant = { ...elephant };

            --newPerson.timeBeforeNextMove;

            evaluateRoutesRecursively(
                newPerson,
                newElephant,
                currentMinute + 1,
                newFlowRate,
                totalFlow + flowRate,
                newAvailableValves,
                allValves,
                distancesBetweenAllValves
            );
            return;
        }

        availableValves.forEach((valve) => {
            const newFlowRate =
                flowRate + allValves[elephant.currentLocation].flowRate;

            const newAvailableValves = new Set(availableValves);
            newAvailableValves.delete(valve);

            const newPerson = { ...person },
                newElephant = { ...elephant };

            newElephant.timeBeforeNextMove =
                distancesBetweenAllValves[elephant.currentLocation + valve] + 1; // +1 because it takes a minute to turn on the valve
            newElephant.currentLocation = valve;

            --newPerson.timeBeforeNextMove;

            evaluateRoutesRecursively(
                newPerson,
                newElephant,
                currentMinute + 1,
                newFlowRate,
                totalFlow + flowRate,
                newAvailableValves,
                allValves,
                distancesBetweenAllValves
            );
        });
        return;
    }

    const newAvailableValves = new Set(availableValves);
    const newPerson = { ...person },
        newElephant = { ...elephant };

    --newPerson.timeBeforeNextMove;
    --newElephant.timeBeforeNextMove;

    evaluateRoutesRecursively(
        newPerson,
        newElephant,
        currentMinute + 1,
        flowRate,
        totalFlow + flowRate,
        newAvailableValves,
        allValves,
        distancesBetweenAllValves
    );
    return;
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
