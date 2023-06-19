// There must be a way to calculate the relative desirability of a valve, based on current position:
// Heuristic is perhaps flow rate / steps before you arrive there

// Parse input into object of objects, showing each valve’s flow rate etc, neighbours etc.
// Route is an object
// Open valves (array of valve names)
// Flow rate
// Total flow
// Minute
// Current location
// I don’t think I need to store the actual path
// Make array of routes
// Pre-populate this with a route at minute 0 (or is that minute 1?) and a location of AA
// While routes[0].minute < 30 (or some similar condition)
// Create temporary routes array
// Go through each route
// Generate a new route for every possible destination in temporary array

//                                        i.     Every possible destination = a valve that’s not yet open, where the flow rate > 0

//         If none exists, just increment all values to fill up the remaining minutes without moving

//                                       ii.     Find how many minutes it’d take to get there

//         This will require a Dijkstra solution
//         Revise how Dijkstra works to see how exactly this should be implemented
//         Dijkstra function should take start node and desired end node
//         Should return an amount of minutes

//                                      iii.     Add flow rate * minutes to get there to total flow

//                                     iv.     Update current flow rate

//                                       v.     Update current location

//                                     vi.     Update current minute

//                                    vii.     Add to temporary array

//         If minute > 30, do not add
// Once all new route objects exist, delete all existing routes and replace them with the new ones
// Sort routes by total flow

const { testInput: input } = require("./input");

function day16Task1(input) {
    const inputByLine = input.split("\n");
    const valves = inputByLine.map(parseInput);
}

function parseInput(valveString) {
    const valve = {};
    const valveNameRegex = /[A-Z]{2}/,
        flowRateRegex = /\d+/,
        leadsToRegex = /[A-Z]{2}/g;
    const [firstHalf, secondHalf] = valveString.split("; ");

    const name = firstHalf.match(valveNameRegex)[0],
        flowRate = Number(firstHalf.match(flowRateRegex)[0]),
        leadsTo = secondHalf.match(leadsToRegex);

    valve.name = name;
    valve.flowRate = flowRate;
    valve.leadsTo = leadsTo;
    console.log(valve);
    return valve;
}

// console.log(day16Task1(input))
module.exports = { day16Task1 };
