const { input } = require("./input");

function day25Task1(input) {
    // in ascending order, i.e. [units, 5s, 25s, 125s]...
    const placeValueTotals = [];

    const inputSplitByRows = input.split("\n");

    inputSplitByRows.forEach((snafu) => {
        /**
         *
         * THIS CAN PROBABLY BE FARMED TO A SEPARATE METHOD
         *
         */
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
    });

    // convert totals array to correct format
    // (either mutate or create a new array)
    // wrap everything in a while loop to ensure it only stops once every value is between -2 and 2
    // loop through totals
    // if value is between -2 and 2, leave it
    // if > 2, find how many times 5 goes into value
    // // if 1 or more:
    // // // add amount of times to next column
    // // // // add error handler in case next column doesn’t yet exist
    // // // add amount % 5 to current column
    // // if < 1:
    // // // add 1 to next column
    // // // find amount – 5 and replace current column with that value
    // if < -2, it’s basically as above, but we subtract from the next column, instead of adding
    // // make some fresh test data to test this out using values that give negative numbers in various columns
    // convert to correct format (- and =), stringify, return
}

module.exports = { day25Task1 };
