//
//
// we're passing the test, but the real data isn't giving us anything good
//
//
//
//
// We're reaching the max stack limit
// - perhaps, prevent the array from reaching a certain size
// - sometimes routes array is empty.
//   - get to the bottom of why this is so that the program can continue to run until the end

const { input } = require("./input");
const { distancesBetweenAllValves } = require("../16/shortest-distances");

const MAX_MINUTES = 30;

function day16Task1(input, distancesBetweenAllValves) {
    /**
     *
     * const distancesBetweenAllValves = findShortestDistancesBetweenAllValves(valves);
     * I wrote the output of this to a file to save time, because it takes ages to calculate
     */

    const inputByLine = input.split("\n");
    const valves = inputByLine.reduce(parseInput, {});
    const valveNames = Object.keys(valves);
    const starterRoute = new Route(valveNames);
    const routes = [starterRoute];

    while (routes[0].minute < MAX_MINUTES) {
        console.log("here", routes[0].minute, routes.length);
        const newRoutes = [];

        routes.forEach((route) => {
            evaluateRoute(route, newRoutes, valves, distancesBetweenAllValves);
        });

        routes.length = 0;
        routes.push(...newRoutes);
        routes.sort((a, b) => {
            const aTimeLeft = MAX_MINUTES - a.minute,
                bTimeLeft = MAX_MINUTES - b.minute;

            const aHeuristic = aTimeLeft * a.flowRate + a.totalFlow,
                bHeuristic = bTimeLeft * b.flowRate + b.totalFlow;
            return bHeuristic - aHeuristic;

            // return b.totalFlow - a.totalFlow; // this one works for the test but not the real data
        });

        if (routes.length > 10000) {
            routes.length = 10000;
        }
    }

    return routes[0].totalFlow;
}

function evaluateRoute(route, newRoutes, valves, distancesBetweenAllValves) {
    const destinations = getPossibleDestinations(route, valves);

    if (!destinations.length) {
        const remainingMinutes = MAX_MINUTES - route.minute;
        const remainingFlow = route.flowRate * remainingMinutes;
        route.totalFlow += remainingFlow;
        route.minute += remainingMinutes;
        newRoutes.push(route);
        return;
    }

    destinations.forEach((destination) => {
        const newRoute = moveToDestination(
            route,
            destination,
            valves,
            distancesBetweenAllValves
        );
        if (newRoute.minute <= MAX_MINUTES) {
            newRoutes.push(newRoute);
            return;
        }
        //
        //
        //
        // experimental
        //
        const remainingMinutes = MAX_MINUTES - route.minute;
        const remainingFlow = route.flowRate * remainingMinutes;
        route.totalFlow += remainingFlow;
        route.minute += remainingMinutes;
        newRoutes.push(route);
    });
}

function moveToDestination(
    route,
    destination,
    valves,
    distancesBetweenAllValves
) {
    const newRoute = new Route(route.availableValves);
    newRoute.flowRate = route.flowRate;
    newRoute.totalFlow = route.totalFlow;
    newRoute.minute = route.minute;
    newRoute.currentLocation = route.currentLocation;

    const lowestTimeToArrival =
        distancesBetweenAllValves[newRoute.currentLocation + destination];

    const additionalMinutes = lowestTimeToArrival + 1; // +1 because it takes one minute to turn on the valve
    updateRoute(newRoute, destination, additionalMinutes, valves);

    return newRoute;
}

function updateRoute(route, newLocation, additionalMinutes, valves) {
    route.totalFlow += route.flowRate * additionalMinutes;
    route.flowRate += valves[newLocation].flowRate;
    route.availableValves.delete(newLocation);
    route.currentLocation = newLocation;
    route.minute += additionalMinutes;
}

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
    findShortestRouteRecursively(start, 0, [], destination, valves, minutes);
    return Math.min(...minutes);
}

function findShortestRouteRecursively(
    currentLocation,
    minutesElapsed,
    visitedValves,
    destination,
    valves,
    minutes
) {
    if (minutesElapsed > MAX_MINUTES) return;
    if (currentLocation === destination) {
        minutes.push(minutesElapsed);
        return;
    }

    for (let valve of valves[currentLocation].leadsTo) {
        if (visitedValves.includes(valve)) continue;

        findShortestRouteRecursively(
            valve,
            minutesElapsed + 1,
            [...visitedValves, valve],
            destination,
            valves,
            minutes
        );
    }
}

function getPossibleDestinations({ availableValves }, valves) {
    const destinations = [];
    availableValves.forEach((openValve) => {
        if (valves[openValve].flowRate > 0) {
            destinations.push(openValve);
        }
    });
    return destinations;
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

class Route {
    constructor(valveNames) {
        this.availableValves = new Set(valveNames);
        this.flowRate = 0;
        this.totalFlow = 0;
        this.minute = 0;
        this.currentLocation = "AA";
    }
}

console.log(day16Task1(input, distancesBetweenAllValves));
module.exports = { day16Task1 };
