const { input, rowToCheck } = require("./input");

// split input into rows
const allSensorsBeaconsStrings = input.split("\n");

// map rows into objects { beaconCoordinates:[], sensorCoords:[], manhattanDistance: Number }
const allSensorsBeacons = allSensorsBeaconsStrings.map(
    (sensorsBeaconsString) => {
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
    }
);

// loop through to identify any sensors where rowToCheck falls within their Manhattan range
const sensorsBeacons = allSensorsBeacons.filter(
    ({ sensorCoordinates, manhattanDistance }) => {
        // if rowToCheck is within sensor[1]+Manhattan AND sensor[1]-Manhattan
        const northernSensorLimit = sensorCoordinates[1] - manhattanDistance;
        const southernSensorLimit = sensorCoordinates[1] + manhattanDistance;
        return (
            northernSensorLimit <= rowToCheck &&
            southernSensorLimit >= rowToCheck
        );
    }
);

// make a Set to house unique coordinates
const cannotBeBeaconOnSpecifiedRow = new Set();

// loop through each relevant sensorBeacon to populate Set
sensorsBeacons.forEach(({ sensorCoordinates, manhattanDistance }) => {
    // find difference in y coordinates between sensorBeacon and rowToCheck
    const differenceInYCoordinate = Math.abs(sensorCoordinates[1] - rowToCheck);
    const manhattanRemainder = manhattanDistance - differenceInYCoordinate;

    // go to left from there by the remainder and go as far right as the equivalent position on the right side
    for (
        let x = sensorCoordinates[0] - manhattanRemainder;
        x <= sensorCoordinates[0] + manhattanRemainder;
        ++x
    ) {
        cannotBeBeaconOnSpecifiedRow.add(`${x},${rowToCheck}`);
    }
});

// loop through sensorsBeacons to remove any sensors/beacons on rowToCheck
sensorsBeacons.forEach(({ sensorCoordinates, beaconCoordinates }) => {
    cannotBeBeaconOnSpecifiedRow.delete(
        `${sensorCoordinates[0]},${sensorCoordinates[1]}`
    );
    cannotBeBeaconOnSpecifiedRow.delete(
        `${beaconCoordinates[0]},${beaconCoordinates[1]}`
    );
});

// return relevant quantity of positions on rowToCheck
console.log(cannotBeBeaconOnSpecifiedRow.size);
