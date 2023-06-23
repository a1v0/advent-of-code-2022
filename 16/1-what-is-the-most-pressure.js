// There must be a way to calculate the relative desirability of a valve, based on current position:
// - Heuristic is perhaps flow rate / steps before you arrive there

// Parse input into object of objects, showing each valve’s flow rate etc, neighbours etc.
// Route is an object
// - Open valves (array of valve names)
// - Flow rate
// - Total flow
// - Minute
// - Current location
// - I don’t think I need to store the actual path
// Make array of routes
// - Pre-populate this with a route at minute 0 (or is that minute 1?) and a location of AA
// While routes[0].minute < 30 (or some similar condition)
// - Create temporary routes array
// - Go through each route
// - Generate a new route for every possible destination in temporary array
// - - Every possible destination = a valve that’s not yet open, where the flow rate > 0
// - - - If none exists, just increment all values to fill up the remaining minutes without moving
// - - Find how many minutes it’d take to get there
// - - - This will require a Dijkstra solution
// - - - Revise how Dijkstra works to see how exactly this should be implemented
// - - - Dijkstra function should take start node and desired end node
// - - - Should return an amount of minutes
// - - Add flow rate * minutes to get there to total flow
// - - Update current flow rate
// - - Update openValves
// - - Update current location
// - - Update current minute
// - - Add to temporary array
// - - - If minute > 30, do not add
// - Once all new route objects exist, delete all existing routes and replace them with the new ones
// - Sort routes by total flow

const { testInput: input } = require("./input");

const MAX_MINUTES = 30;

function day16Task1(input) {
    const inputByLine = input.split("\n");
    const valves = inputByLine.reduce(parseInput, {});
    const valveNames = Object.keys(valves);
    const starterRoute = new Route(valveNames);
    const routes = [starterRoute];
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
    // should it be <= MAX_MINUTES?
    while (routes[0].currentMinute < MAX_MINUTES) {
        const newRoutes = [];
        for (let i = 0; i < routes.length; ++i) {
            evaluateRoute(routes[i], newRoutes, valves);
        }

        routes.length = 0;
        routes.push(...newRoutes);
        routes.sort((a, b) => {
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
            //
            //
            //
            // this may need a better heuristic, e.g. some combination of flow rate with amount of minutes left
            return b.flowRate - a.flowRate;
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
        newRoutes.push(route);
        return;
    }

    destinations.forEach((destination) => {
        const newRoute = moveToDestination(route, destination, valves);
        //
        //
        //
        //
        //
        //
        //
        //
        // should this be <=?
        if (newRoute.currentMinute < MAX_MINUTES) {
            newRoutes.push();
        }
    });
}

function moveToDestination(route, destination, valves) {
    const newRoute = new Route(route.openValves);
    newRoute.flowRate = route.flowRate;
    newRoute.totalFlow = route.totalFlow;
    newRoute.minute = route.minute;
    newRoute.currentLocation = route.currentLocation;

    const lowestTimeToArrival = calculateShortestDistanceToValve(
        newRoute.currentLocation,
        destination,
        valves
        //
        //
        //
        //
        //
        //
        //
        //
        // if it gets too computationally heavy, we can add a max route length equal to 30 - elapsed time
    );

    const additionalMinutes = lowestTimeToArrival + 1; // +1 because it takes one minute to turn on the valve
    updateRoute(newRoute, destination, additionalMinutes, valves);

    return newRoute;
}

function updateRoute(route, newLocation, additionalMinutes, valves) {
    route.totalFlow += route.flowRate * additionalMinutes;
    route.flowRate += valves[newLocation].flowRate;
    route.openValves.delete(newLocation);
    route.currentLocation = newLocation;
    route.currentMinute += additionalMinutes;
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

function getPossibleDestinations({ openValves }, valves) {
    const destinations = [];
    openValves.forEach((openValve) => {
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
        this.openValves = new Set(valveNames);
        this.flowRate = 0;
        this.totalFlow = 0;
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
        // should this be 0 or 1?
        this.minute = 0;
        this.currentLocation = "AA";
    }
}

// console.log(day16Task1(input))
module.exports = { day16Task1 };
