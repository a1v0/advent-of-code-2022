const { testInput: input } = require("./input");

// I have a feeling that my solution will be immensely inefficient

// split input into rows
// map rows into objects { beaconCoordinates:[], sensorCoords:[], manhattanDistance: Number }
// identify highest and lowest x and y coordinates
// create array to house all cells that can't be a beacon
// loop through entire range of possible coordinates for every sensor and add all impossible coordinates to array
// // make sure you don't count the same coordinates twice
// // make sure you don't count coordinates that contain a beacon
// reduce array to a count of all values where y=2000000
