const { input } = require("./input");

const day25Task1 = (input) => {
    // in ascending order, i.e. [units, 5s, 25s, 125s]...
    const placeValueTotals = [];

    const inputSplitByRows = input.split("\n");

    inputSplitByRows.forEach((snafu) => {
        extractPlaceValueTotals(snafu, placeValueTotals);
    });

    return adjustDecimalTotals(placeValueTotals);
};

const adjustDecimalTotals = (placeValueTotals) => {
    for (let i = 0; i < placeValueTotals.length; ++i) {
        let currentValue = placeValueTotals[i];
        if (currentValue >= -2 && currentValue <= 2) continue;

        /**
         *
         *
         * THIS CODE FEELS LIKE IT MIGHT BE QUITE REPETITIVE.
         * CONSIDER REFACTORING
         *
         *
         */

        if (currentValue > 2) {
            const howManyFives = Math.floor(currentValue / 5);
            if (howManyFives > 0) {
                placeValueTotals[i + 1] += howManyFives;
                // // // //
                // // // //
                // // // // add error handler in case next column doesn’t yet exist
                // // // //
                // // // //
                const leftOver = currentValue % 5;
                placeValueTotals[i] = leftOver;
            } else {
                placeValueTotals[i + 1] += 1;
                const newValue = currentValue - 5;
                placeValueTotals[i] = newValue;
            }
        }

        if (currentValue < -2) {
            /**
             *
             *
             * CAN THIS SECTION BE REFACTORED TO ESSENTIALLY COPY THE ABOVE BUT USING SOMETHING LIKE MATH.SIGN?
             *
             *
             *
             */

            const positiveCurrentValue = Math.abs(currentValue);
            const howManyFives = Math.floor(positiveCurrentValue / 5);
            if (howManyFives > 0) {
                placeValueTotals[i + 1] -= howManyFives;
                // // // //
                // // // //
                // // // // add error handler in case next column doesn’t yet exist
                // // // //
                // // // //
                const leftOver = positiveCurrentValue % 5;
                placeValueTotals[i] = leftOver * -1;
            } else {
                placeValueTotals[i + 1] -= 1;
                const newValue = currentValue + 5;
                placeValueTotals[i] = newValue;
            }
        }
    }

    return convertDecimalToSnafu(placeValueTotals);

    // wrap everything in a while loop to ensure it only stops once every value is between -2 and 2
    // // make some fresh test data to test this out using values that give negative numbers in various columns
    // convert to correct format (- and =), stringify, return
};

const convertDecimalToSnafu = (placeValueTotals) => {};

const extractPlaceValueTotals = (snafu, placeValueTotals) => {
    const chars = snafu.split("");
    const charsAscending = chars.reverse();

    charsAscending.forEach((char, index) => {
        let increment;
        switch (char) {
            case "-":
                increment = -1;
                break;
            case "=":
                increment = -2;
                break;
            default:
                increment = Number(char);
                break;
        }

        if (!placeValueTotals[index]) placeValueTotals[index] = 0;

        placeValueTotals[index] += increment;
    });
};

module.exports = { day25Task1 };
