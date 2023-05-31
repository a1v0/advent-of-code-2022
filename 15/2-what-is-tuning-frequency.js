const { input, sizeLimit } = require("./input");

const allSensorsBeaconsStrings = input.split("\n");

const allSensorsBeacons = allSensorsBeaconsStrings.map(
    (sensorsBeaconsString) => {
        const numsRegex = /(?<=[xy]=)-*\d+/g;
        const numsStrings = sensorsBeaconsString.match(numsRegex);

        const nums = numsStrings.map((numsString) => {
            return Number(numsString);
        });
        
const        sensorCoordinates= [nums[0], nums[1]];
     const       beaconCoordinates= [nums[2], nums[3]];
          const  manhattanDistance=                Math.abs(nums[0] - nums[2]) + Math.abs(nums[1] - nums[3])

        return {
            sensorCoordinates,
            beaconCoordinates,
            manhattanDistance
        };
    }
);

const beacon = [];

// loop through every row (it's 4mil rows, so may be inefficient...)
for (let y = 0; y <= sizeLimit; ++y) {
    const sensorsBeacons = allSensorsBeacons.filter(
        ({ sensorCoordinates, manhattanDistance }) => {
            // if y is within sensor[1] + Manhattan AND sensor[1] - Manhattan
            const northernSensorLimit =
                sensorCoordinates[1] - manhattanDistance;
            const southernSensorLimit =
                sensorCoordinates[1] + manhattanDistance;
            return northernSensorLimit <= y && southernSensorLimit >= y;
        }
    );

    const rowRanges = sensorsBeacons.map(
        ({ sensorCoordinates, manhattanDistance }) => {
            // find difference in y coordinates between sensorBeacon and rowToCheck
            const differenceInYCoordinate = Math.abs(sensorCoordinates[1] - y);
            const manhattanRemainder =
                manhattanDistance - differenceInYCoordinate;

            const startX =
                sensorCoordinates[0] - manhattanRemainder < 0
                    ? 0
                    : sensorCoordinates[0] - manhattanRemainder;
            const endX =
                sensorCoordinates[0] + manhattanRemainder > sizeLimit
                    ? sizeLimit
                    : sensorCoordinates[0] + manhattanRemainder;
            return [startX, endX];
        }
    );

    rowRanges.sort((a, b) => {
        if (a[0] !== b[0]) {
            return a[0] - b[0];
        } else {
            return a[1] - b[1];
        }
    });

    // this statement checks in case the x coordinate is 0. I happen to know that the x coordinate in my data set is not 0, so I am commenting it out for efficiency's sake
    // if (rowRanges[0][0] > 0) {
    //     beacon[0] = 0;
    //     beacon[1] = y;
    // }

    let x = 0;

    for (let i = 0; i < rowRanges.length; ++i) {
        if (x + 1 < rowRanges[i][0]) {
            beacon[0] = ++x; // because we want the coordinate adjacent to the last available one
            beacon[1] = y;
            break;
        }
        x = rowRanges[i][1] > x ? rowRanges[i][1] : x;
    }

    if (beacon[0] !== undefined) break;
}

const tuningFrequency = beacon[0] * 4000000 + beacon[1];
console.log(tuningFrequency);
