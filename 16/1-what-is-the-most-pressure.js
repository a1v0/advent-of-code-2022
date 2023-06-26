// There must be a way to calculate the relative desirability of a valve, based on current position:
// - Heuristic is perhaps flow rate / steps before you arrive there

//
//
// we're passing the test, but the real data isn't giving us anything good
//
// TO DO:
// - PERHAPS CREATE A NEW SET TO CONTAIN VALVES THAT ARE INDEED OPEN
// - run some tests by setting the max minutes property to something lower
// - see if you can add a heuristic to the sorting function to see if it fixes anything
//
//
//
// - this is very slow when given the major data.
// - i wonder if we can do a preliminary calculation to find the shortest routes from each location to each other location. this should save much time
//
//
//
//
//

const { input } = require("./input");

const MAX_MINUTES = 30;

function day16Task1(input) {
    const inputByLine = input.split("\n");
    const valves = inputByLine.reduce(parseInput, {});
    const valveNames = Object.keys(valves);
    const starterRoute = new Route(valveNames);
    const routes = [starterRoute];

    while (routes[0].minute < MAX_MINUTES) {
        console.log("here", routes[0].minute, routes.length);
        const newRoutes = [];

        routes.forEach((route) => {
            evaluateRoute(route, newRoutes, valves);
        });

        routes.length = 0;
        routes.push(...newRoutes);
        routes.sort((a, b) => {
            // heuristic needed here, e.g. flowRate * minutes left?
            //
            //
            //
            //
            //
            //
            //
            //
            //

            const aTimeLeft = MAX_MINUTES - a.minute,
                bTimeLeft = MAX_MINUTES - b.minute;

            const aHeuristic = aTimeLeft * a.flowRate + a.totalFlow,
                bHeuristic = bTimeLeft * b.flowRate + b.totalFlow;
            return bHeuristic - aHeuristic; // this does not pass the tests

            // return b.totalFlow - a.totalFlow; // this one works for the test but not the real data
        });
    }

    return routes[0].totalFlow;
}

function evaluateRoute(route, newRoutes, valves) {
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
        const newRoute = moveToDestination(route, destination, valves);
        if (newRoute.minute <= MAX_MINUTES) {
            newRoutes.push(newRoute);
        }
    });
}

function moveToDestination(route, destination, valves) {
    const newRoute = new Route(route.availableValves);
    newRoute.flowRate = route.flowRate;
    newRoute.totalFlow = route.totalFlow;
    newRoute.minute = route.minute;
    newRoute.currentLocation = route.currentLocation;

    const lowestTimeToArrival = calculateShortestDistanceToValve(
        newRoute.currentLocation,
        destination,
        valves
        // if it gets too computationally heavy, we can add a max route length equal to 30 - elapsed time
    );

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

function generateAllShortestRoutes(valves) {
    // this method finds the shortest route between all valves worth going to, i.e. whose flowRate > 0
    const routeLengths = {};
    for (let startValve in valves) {
        if (valves[startValve].flowRate < 1) continue;

        for (let destinationValve in valves) {
            if (valves[destinationValve].flowRate < 1) continue;
            if (destinationValve === startValve) continue;
            routeLengths[startValve + destinationValve] =
                findShortestRouteRecursively(
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

// console.log(day16Task1(input));
module.exports = { day16Task1 };
