const { input } = require("./input");

// I have a feeling that my solution will be immensely inefficient

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
const cannotBeBeacon = [];

// loop through entire range of possible coordinates for every sensor and add all impossible coordinates to array
sensorsBeacons.forEach(
    ({ sensorCoordinates, manhattanDistance }) => {
        console.log(sensorCoordinates, "----------------------");
        let yDistanceFromSensor = manhattanDistance;
        let xDistanceFromSensor = 0;

        // if (sensorCoordinates[0] === 8 && sensorCoordinates[1] === 7) {
        while (yDistanceFromSensor >= 0) {
            for (
                let x = sensorCoordinates[0] - xDistanceFromSensor;
                x <= sensorCoordinates[0] + xDistanceFromSensor;
                ++x
            ) {
                if (
                    !cannotBeBeacon.includes(
                        `${x},${sensorCoordinates[1] - yDistanceFromSensor}`
                    )
                ) {
                    cannotBeBeacon.push(
                        `${x},${sensorCoordinates[1] - yDistanceFromSensor}`
                    );
                }

                if (
                    !cannotBeBeacon.includes(
                        `${x},${sensorCoordinates[1] + yDistanceFromSensor}`
                    )
                ) {
                    cannotBeBeacon.push(
                        `${x},${sensorCoordinates[1] + yDistanceFromSensor}`
                    );
                }
            }
            --yDistanceFromSensor;
            ++xDistanceFromSensor;
        }
    }
    // }
);
sensorsBeacons.forEach(({ sensorCoordinates, beaconCoordinates }) => {
    // delete sensor's coordinates from array if necessary
    if (
        cannotBeBeacon.includes(
            `${sensorCoordinates[0]},${sensorCoordinates[1]}`
        )
    ) {
        cannotBeBeacon.splice(
            cannotBeBeacon.indexOf(
                `${sensorCoordinates[0]},${sensorCoordinates[1]}`
            ),
            1
        );
    }
    // delete beacon's coordinates from array if necessary
    if (
        cannotBeBeacon.includes(
            `${beaconCoordinates[0]},${beaconCoordinates[1]}`
        )
    ) {
        cannotBeBeacon.splice(
            cannotBeBeacon.indexOf(
                `${beaconCoordinates[0]},${beaconCoordinates[1]}`
            ),
            1
        );
    }
});

// reduce array to a count of all values where y=2000000
const cannotBeBeaconOnSpecificRow = cannotBeBeacon.reduce(
    (accumulator, coordinates) => {
        const splitCoordinates = coordinates.split(",");
        return Number(splitCoordinates[1]) === 10
            ? accumulator + 1
            : accumulator;
    },
    0
);
console.log(cannotBeBeaconOnSpecificRow);
