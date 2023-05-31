const { input, rowToCheck } = require("./input");

const allSensorsBeaconsStrings = input.split("\n");

const allSensorsBeacons = allSensorsBeaconsStrings.map(
    (sensorsBeaconsString) => {
        const numsRegex = /(?<=[xy]=)-*\d+/g;
        const numsStrings = sensorsBeaconsString.match(numsRegex);

        const nums = numsStrings.map((numsString) => {
            return Number(numsString);
        });
        
        const sensorCoordinates= [nums[0], nums[1]]
        const beaconCoordinates=[nums[2], nums[3]]
        const manhattanDistance=                Math.abs(nums[0] - nums[2]) + Math.abs(nums[1] - nums[3])

        return {
            sensorCoordinates,
            beaconCoordinates,
            manhattanDistance
        };
    }
);

const sensorsBeacons = allSensorsBeacons.filter(
    ({ sensorCoordinates, manhattanDistance }) => {
        // if rowToCheck is within sensor[1] + Manhattan AND sensor[1] - Manhattan
        const northernSensorLimit = sensorCoordinates[1] - manhattanDistance;
        const southernSensorLimit = sensorCoordinates[1] + manhattanDistance;
        return (
            northernSensorLimit <= rowToCheck &&
            southernSensorLimit >= rowToCheck
        );
    }
);

const cannotBeBeaconOnSpecifiedRow = new Set();

sensorsBeacons.forEach(({ sensorCoordinates, manhattanDistance }) => {
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

sensorsBeacons.forEach(({ sensorCoordinates, beaconCoordinates }) => {
    cannotBeBeaconOnSpecifiedRow.delete(
        `${sensorCoordinates[0]},${sensorCoordinates[1]}`
    );
    cannotBeBeaconOnSpecifiedRow.delete(
        `${beaconCoordinates[0]},${beaconCoordinates[1]}`
    );
});

console.log(cannotBeBeaconOnSpecifiedRow.size);
