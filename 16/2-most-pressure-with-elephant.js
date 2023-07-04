const { input } = require("./input");
const { distancesBetweenAllValves } = require("./shortest-distances");

//
// availableValves is object, not set
// - if valve is true, then it's available
// - delete it once you update the flowRate
// - if you delete it, then the no. of keys can serve as a proxy for number of available routes
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

function day16Task2(input, distancesBetweenAllValves) {}

// console.log(day16Task2(input, distancesBetweenAllValves));
module.exports = { day16Task2 };
