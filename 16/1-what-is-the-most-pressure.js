const { testInput: input } = require("./input");

// split input into rows
// map rows into objects: { flowRate: Number, flowing: false, flowingSince: undefined, leadsTo: [] }
// loop through rows to add appropriate object references to leadsTo array
// create sort callback function, to put all flowing valves at the end of the array, and otherwise sort valves by flow rate (descending)
// create currentValve variable
// create function to find shortest path from current object to first object in sorted array
// // turn on valve once you reach it
// // sort array (this can be done elsewhere in the code, too)
// start at AA
