const { testInput: input } = require("./input");

//
//
//
//
//
//
//
// maximum set size is being reached before even the first sensor has been processed
//
// instead of logging every single coordinate that can't be a beacon, I should simply work out which cells are blocked on one particular row
//
//
//
//
//
//
//
//

// NEW PLAN
// split and map, as before
// loop through to identify any sensors where 2000000 falls within their Manhattan range
// // if sensor[1]+Manhattan OR sensor[1]-Manhattan is within rowToCheck
// make a Set to house unique coordinates
// loop through each relevant sensorBeacon to populate Set
// // find difference in y coordinates between sensorBeacon and rowToCheck
// // go to left from there by the remainder and go as far right as the equivalent position on the right side
// loop through sensorsBeacons to remove any sensors/beacons on rowToCheck
// return relevant quantity of positions on rowToCheck

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

// define row parameter
const rowToCheck = 10;

// split input into rows
const sensorsBeaconsStrings = input.split("\n");

// map rows into objects { beaconCoordinates:[], sensorCoords:[], manhattanDistance: Number }
const sensorsBeacons = sensorsBeaconsStrings.map((sensorsBeaconsString) => {
    const numsRegex = /(?<=[xy]=)-*\d+/g;
    const numsStrings = sensorsBeaconsString.match(numsRegex);

    const nums = numsStrings.map((numsString) => {
        return Number(numsString);
    });

    return {
        sensorCoordinates: [nums[0], nums[1]],
        beaconCoordinates: [nums[2], nums[3]],
        manhattanDistance:
            Math.abs(nums[0] - nums[2]) + Math.abs(nums[1] - nums[3])
    };
});

// identify highest and lowest x and y coordinates
let lowestX = Infinity,
    lowestY = Infinity,
    highestX = -Infinity,
    highestY = -Infinity;

sensorsBeacons.forEach((sensorBeacon) => {
    if (sensorBeacon.sensorCoordinates[0] < lowestX) {
        lowestX = sensorBeacon.sensorCoordinates[0];
    }
    if (sensorBeacon.beaconCoordinates[0] < lowestX) {
        lowestX = sensorBeacon.beaconCoordinates[0];
    }
    if (sensorBeacon.sensorCoordinates[0] > highestX) {
        highestX = sensorBeacon.sensorCoordinates[0];
    }
    if (sensorBeacon.beaconCoordinates[0] > highestX) {
        highestX = sensorBeacon.beaconCoordinates[0];
    }

    if (sensorBeacon.sensorCoordinates[1] < lowestY) {
        lowestY = sensorBeacon.sensorCoordinates[1];
    }
    if (sensorBeacon.beaconCoordinates[1] < lowestY) {
        lowestY = sensorBeacon.beaconCoordinates[1];
    }
    if (sensorBeacon.sensorCoordinates[1] > highestY) {
        highestY = sensorBeacon.sensorCoordinates[1];
    }
    if (sensorBeacon.beaconCoordinates[1] > highestY) {
        highestY = sensorBeacon.beaconCoordinates[1];
    }
});

// create array to house all cells that can't be a beacon
const cannotBeBeacon = new Set();

// loop through entire range of possible coordinates for every sensor and add all impossible coordinates to array
sensorsBeacons.forEach(({ sensorCoordinates, manhattanDistance }) => {
    console.log(sensorCoordinates, "----------------------");
    let yDistanceFromSensor = manhattanDistance;
    let xDistanceFromSensor = 0;

    while (yDistanceFromSensor >= 0) {
        for (
            let x = sensorCoordinates[0] - xDistanceFromSensor;
            x <= sensorCoordinates[0] + xDistanceFromSensor;
            ++x
        ) {
            cannotBeBeacon.add(
                `${x},${sensorCoordinates[1] - yDistanceFromSensor}`
            );

            cannotBeBeacon.add(
                `${x},${sensorCoordinates[1] + yDistanceFromSensor}`
            );
        }
        --yDistanceFromSensor;
        ++xDistanceFromSensor;
        console.log(yDistanceFromSensor);
    }
});
sensorsBeacons.forEach(({ sensorCoordinates, beaconCoordinates }) => {
    // delete sensor's coordinates from array if necessary
    if (cannotBeBeacon.has(`${sensorCoordinates[0]},${sensorCoordinates[1]}`)) {
        cannotBeBeacon.delete(
            `${sensorCoordinates[0]},${sensorCoordinates[1]}`
        );
    }
    // delete beacon's coordinates from array if necessary
    if (cannotBeBeacon.has(`${beaconCoordinates[0]},${beaconCoordinates[1]}`)) {
        cannotBeBeacon.delete(
            `${beaconCoordinates[0]},${beaconCoordinates[1]}`
        );
    }
});

// reduce array to a count of all values where y=2000000
let cannotBeBeaconOnSpecificRow = 0;
cannotBeBeacon.forEach((coordinates) => {
    const splitCoordinates = coordinates.split(",");
    if (Number(splitCoordinates[1]) === rowToCheck) {
        ++cannotBeBeaconOnSpecificRow;
    }
});

console.log(cannotBeBeaconOnSpecificRow);
