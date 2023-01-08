const { testInput: input } = require("./input");

// wrapping the whole file in a function is not an elegant way to test, I admit
function day20Task1(input) {
    // convert input to array of strings
    const inputStrings = input.split("\n");

    const inputLength = inputStrings.length;

    // map strings into objects { move: Number(string), originalIndex: index }
    const numbers = inputStrings.map((inputString, index) => {
        return { move: Number(inputString), originalIndex: index };
    });
    const numbersStrings = [inputStrings.join(", ")];

    // loop through mapped array, but in order of originalIndex
    for (let i = 0; i < inputLength; ++i) {
        const currentIndex = numbers.findIndex((number) => {
            return number.originalIndex === i;
        });
        const currentNumber = numbers[currentIndex];

        // calculate new position of object
        // // while loop to ensure the wraparound works correctly
        // // remember that position 0 is equivalent to position length-1. Array is like a circle, where each end is connected. So if -1 is at index 0, it would end up at length-2
        let newIndex = currentIndex + currentNumber.move;
        while (newIndex < 0 || newIndex >= inputLength) {
            // PROBLEM: I think that, if we're going left, any newIndex of 0 should go to inputLength-1, and the inverse if we're going right
            if (newIndex < 0) {
                newIndex += inputLength - 2;
            } else {
                newIndex -= inputLength - 1;
            }
        }

        // splice object and reinsert at new location
        // WARNING: this could get buggy if there's a lot of wrapping around. Let's see what happens
        numbers.splice(currentIndex, 1);
        numbers.splice(newIndex, 0, currentNumber);

        const currentStateOfNumbers = numbers.map((number) => {
            return number.move;
        });
        numbersStrings.push(currentStateOfNumbers.join(", "));
    }
    // once loop is complete, loop through array again to identify 1000th, 2000th and 3000th 'index' (using a while loop again), summing the values
    console.log(numbersStrings);
    return { numbersStrings };
}
day20Task1(input);
module.exports = { day20Task1 };
