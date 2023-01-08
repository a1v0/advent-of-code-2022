const { input } = require("./input");

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
        let newIndex = (currentIndex + currentNumber.move) % (inputLength - 1);
        if (currentNumber.move < 0 && newIndex == 0) {
            newIndex = inputLength - 1;
        }
        if (currentNumber.move > 0 && newIndex == inputLength - 1) {
            newIndex = 0;
        }

        // splice object and reinsert at new location
        numbers.splice(currentIndex, 1);
        numbers.splice(newIndex, 0, currentNumber);

        const currentStateOfNumbers = numbers.map((number) => {
            return number.move;
        });
        numbersStrings.push(currentStateOfNumbers.join(", "));
    }

    // once loop is complete, loop through array again to identify 1000th, 2000th and 3000th 'index' (using a while loop again), summing the values
    const indexOfZero = numbers.findIndex((number) => {
        return number.move === 0;
    });

    const oneThou = numbers[(indexOfZero + 1000) % inputLength].move;
    const twoThou = numbers[(indexOfZero + 2000) % inputLength].move;
    const threeThou = numbers[(indexOfZero + 3000) % inputLength].move;

    return {
        numbersStrings,
        oneThou,
        twoThou,
        threeThou,
        sumOfThree: oneThou + twoThou + threeThou
    };
}
console.log("Sum of three: ", day20Task1(input).sumOfThree);
module.exports = { day20Task1 };
