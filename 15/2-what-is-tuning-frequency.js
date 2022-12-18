const { input, sizeLimit } = require("./input");

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

// create array to store beacon's location
const beacon = [];

// loop through every row (it's 4mil rows, so may be inefficient...)
for (let y = 0; y <= sizeLimit; ++y) {
    console.log(y);
    // loop through to identify any sensors where rowToCheck falls within their Manhattan range
    const sensorsBeacons = allSensorsBeacons.filter(
        ({ sensorCoordinates, manhattanDistance }) => {
            // if y is within sensor[1]+Manhattan AND sensor[1]-Manhattan
            const northernSensorLimit =
                sensorCoordinates[1] - manhattanDistance;
            const southernSensorLimit =
                sensorCoordinates[1] + manhattanDistance;
            return northernSensorLimit <= y && southernSensorLimit >= y;
        }
    );

    // using logic similar to Task 1, identify ranges, as [startX, endX]
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

    rowRanges.sort((a, b) => {
        if (a[0] !== b[0]) {
            return a[0] - b[0];
        } else {
            return a[1] - b[1];
        }
    });

    // this statement checks in case the x coordinate is x. I happen to know that the x coordinate in my data set is not 0, so I am commenting it out for efficiency's sake
    // if (rowRanges[0][0] > 0) {
    //     beacon[0] = 0;
    //     beacon[1] = y;
    // }

    let x = 0;

    // console.log(rowRanges);
    for (let i = 0; i < rowRanges.length; ++i) {
        if (x + 1 < rowRanges[i][0]) {
            beacon[0] = ++x; // because we want the coordinate adjacent to the last available one
            beacon[1] = y;
            // console.log(x, "x when breaking");
            break;
        }
        x = rowRanges[i][1] > x ? rowRanges[i][1] : x;
        // console.log(x, "x");
    }

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
    // THIS SECTION IS FAR TOO INEFFICIENT TO WORK AT SCALE
    // takes 2.1s per row

    /*
    // create set to house all used-up x coordinates
    const xCoordinates = new Set();

    rowRanges.forEach((rowRange) => {
        for (let x = rowRange[0]; x <= rowRange[1]; ++x) {
            xCoordinates.add(x);
        }
    });

    for (let x = 0; x <= sizeLimit; ++x) {
        if (!xCoordinates.has(x)) {
            beacon[0] = x;
            beacon[1] = y;
        }
    }*/

    if (beacon[0] !== undefined) break;
}

console.log(beacon);

// multiply x by 4000000 and add y
const tuningFrequency = beacon[0] * 4000000 + beacon[1];
console.log(tuningFrequency);

// 277972105916
