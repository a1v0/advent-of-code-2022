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
    let isAdjustmentComplete = false;

    while (!isAdjustmentComplete) {
        isAdjustmentComplete = true;

        for (let i = 0; i < placeValueTotals.length; ++i) {
            let currentValue = placeValueTotals[i];
            if (currentValue >= -2 && currentValue <= 2) continue;

            isAdjustmentComplete = false;

            const sign = Math.sign(currentValue);
            const absoluteCurrentValue = Math.abs(currentValue);
            const howManyFives = Math.floor(absoluteCurrentValue / 5);

            if (howManyFives >= 1) {
                placeValueTotals[i + 1] += sign * howManyFives;
                const leftOver = absoluteCurrentValue % 5;
                placeValueTotals[i] = sign * leftOver;
            } else {
                placeValueTotals[i + 1] += sign * 1;
                const newValue = currentValue - sign * 5;
                placeValueTotals[i] = newValue;
            }
        }
    }

    return convertDecimalToSnafu(placeValueTotals);
};

const convertDecimalToSnafu = (placeValueTotals) => {
    placeValueTotals.reverse();

    return placeValueTotals.reduce((accumulator, currentValue) => {
        let number;
        switch (currentValue) {
            case -2:
                number = "=";
                break;
            case -1:
                number = "-";
                break;
            default:
                number = String(currentValue);
                break;
        }

        return accumulator + number;
    }, "");
};

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

console.log(day25Task1(input));

module.exports = { day25Task1 };
