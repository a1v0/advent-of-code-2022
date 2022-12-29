const { testInput: input } = require("./input");

// split input to lines
// map lines into some sort of pseudo-graph of objects, e.g. { coordinates: [], coordinatesAsString:'1,2,3', sidesShowing: 6, topNeighbour: '1,2,3', bottomNeighbour: '2,3,4' ... }
// loop through objects, checking if any potential neighbours exist
// // if so, deduct 1 from sidesShowing from both objects
// loop through objects to count sides showing
