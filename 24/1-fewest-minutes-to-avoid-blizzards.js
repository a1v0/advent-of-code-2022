const { input } = require("./input");

function day24Task1(input) {
    // split input into rows
    // create array of blizzards
    // map blizzards into objects:
    // {
    //     direction: ">",
    //     cycle: input.width, // (or input.height if vertical)
    //     initial state: [x, y], // this property might not be necessary
    //     minute1: [x, y]
    //     minute2: [x, y],
    //     isEndReached: false
    // };
    // to calculate position at any given time, use currentMinute % blizzard.cycle (the exact formula may need tweak by 1 in either direction. Let's see)
    // identify coordinates of start and end
    // implement some sort of A* search with time and distance from goal as metric (e.g. time * distance)
    // distance calculated by Pythagoras
    // create array to house routes
    // put startup route into array: { currentPosition: [x, y], heuristic: Infinity }
    // create minutes counter
    // while !routes[0].isEndReached
    // // create newRoutes array
    // // routes.forEach
    // // // identify which directions you can go in the next minute
    // // // create routes for all directions, adding coefficients, and add to newRoutes
    // // // POTENTIAL PROBLEM: I'm not checking whether we're visiting a space we've already been to, because the same location may present different opportunities at different points. This might result in our program running out of memory and/or taking ages
    // // routes.clear
    // // routes.push(...newRoutes)
    // // sort routes with shortest heuristic coming first
    // // ++minutes
    // return minutes
}

// console.log(day24Task1(input));
module.exports = { day24Task1 };
