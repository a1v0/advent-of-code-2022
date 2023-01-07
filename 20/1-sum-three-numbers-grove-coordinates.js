const { testInput: input } = require("./input");

// convert input to array of strings
// map strings into objects { move: Number(string), originalIndex: index }
// loop through mapped array, but in order of originalIndex
// // do a findIndex where originalIndex === i
// calculate new position of object
// // do a while loop to ensure the wraparound works correctly
// // remember that position 0 is equivalent to position length-1. Array is like a circle, where each end is connected. So if -1 is at index 0, it would end up at length-2
// splice/slice (can't remember which) object and reinsert at new location
// once loop is complete, loop through array again to identify 1000th, 2000th and 3000th 'index' (using a while loop again), summing the values
