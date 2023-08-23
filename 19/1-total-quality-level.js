const { input } = require("./input");

/**
 * This solution is a brute-force solution.
 * I'm not overly happy about it, but I can't
 * find any shortcut or heuristic on which to
 * base any alternative solution.
 */

// Trial and error algo
// Loop over all blueprints
//     Add a console log every time a new blueprint starts
// Backtracking/recursion
//     Given we’re running for just 20-odd minutes, we shouldn’t run into problems re: reaching the stack limit
//     However, it might take a while to run, since it’s essentially a brute-force method that has to evaluate every single possibility
//         Is there a way to filter out ones that are unlikely to yield anything good?
// Evaluate every single combination by doing the following every time:
//     Build every type of robot you can
//     Build nothing
// When we reach the maximum amount of minutes, update the maximum number of geodes, then return
//     Possibly add a log every time we reach this point, just so we know how fast/slow the script is running
//     If it’s cluttered, then perhaps every time the max number is updated
// Do the addition etc.

const day19Task1 = (input) => {
    const blueprints = buildBlueprints(input);
    const geodeTotals = []; // stores the maximum number of geodes per blueprint

    blueprints.forEach((blueprint, index) => {
        const geodeTotal = evaluateBlueprint(blueprint, index);
        geodeTotals.push(geodeTotal);
    });

    // make recursive/backtracking method to recursively do each possible thing:
    //    build any robot that you can afford
    //       and
    //    don't build anything
    // when we reach 24 minutes, update no. of geodes and return
    //    possibly add a console log here (unless it's cluttered, in which case perhaps just do it every time we update the max. geodes value)
    //
    // determine quality level
};
// console.log(day19Task1(input));

const evaluateBlueprint = (blueprint, index) => {
    console.log(`Evaluating Blueprint ${index + 1}.`);
    const maxGeodes = new GeodeCounter();
    const inventory = { robots: {}, items: {} };

    buildBotsRecursively(blueprint, inventory, 1, maxGeodes);

    return maxGeodes.maximum;
};

const buildBotsRecursively = (blueprint, inventory, minute, maxGeodes) => {
    // add a minute's worth of stock to items to un-cloned inventory

    if (minute === 24) {
        // update max number of geodes
        return;
    }

    // loop through blueprint to find any robot we can afford
    // clone inventory (maybe make a method to do this)
    // run recursive method for each robot
    // clone inventory and run recursive method without having bought anything
};

class GeodeCounter {
    constructor() {
        this.maximum = 0;
    }

    updateMaximum(newMaximum) {
        if (newMaximum > this.maximum) {
            this.maximum = newMaximum;
        }
    }
}

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Utility methods for input parsing
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

const buildBlueprints = (input) => {
    const blueprintRows = input.split("\n");
    const blueprints = blueprintRows.map(parseBlueprintRow);

    return blueprints;
};

const parseBlueprintRow = (blueprintRow) => {
    const titleRegex = /^Blueprint \d: /;
    const blueprintWithoutTitle = blueprintRow.replace(titleRegex, "");
    const blueprintElements = blueprintWithoutTitle.split(". ");
    const blueprint = blueprintElements.reduce(parseBlueprintElement, {});
    return blueprint;
};

const parseBlueprintElement = (blueprint, blueprintElement) => {
    const robotNameRegex = /(?<=Each )\w+(?= robot)/;
    const robotName = blueprintElement.match(robotNameRegex)[0];

    const costsRegex = /(?<=costs )[\w\s]+/; // returns all costs, including an "and", if applicable
    const unparsedCosts = blueprintElement.match(costsRegex)[0];
    const costElements = unparsedCosts.split(" and ");

    const cost = costElements.reduce(parseCosts, {});

    blueprint[robotName] = cost;
    return blueprint;
};

const parseCosts = (costs, costElement) => {
    const priceRegex = /^\d+/;
    const price = Number(costElement.match(priceRegex)[0]);
    const typeRegex = /[a-z]+$/;
    const type = costElement.match(typeRegex)[0];

    costs[type] = price;
    return costs;
};

module.exports = { day19Task1 };
