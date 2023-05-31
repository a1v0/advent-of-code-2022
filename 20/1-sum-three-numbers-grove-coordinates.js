const { input } = require("./input");

function day20Task1(input) {
    const inputStrings = input.split("\n");

    const inputLength = inputStrings.length;

    const numbers = inputStrings.map((inputString, index) => {
        return { move: Number(inputString), originalIndex: index };
    });
    const numbersStrings = [inputStrings.join(", ")];

    for (let i = 0; i < inputLength; ++i) {
        const currentIndex = numbers.findIndex((number) => {
            return number.originalIndex === i;
        });
        const currentNumber = numbers[currentIndex];

        let newIndex = (currentIndex + currentNumber.move) % (inputLength - 1);
        if (currentNumber.move < 0 && newIndex == 0) {
            newIndex = inputLength - 1;
        }
        if (currentNumber.move > 0 && newIndex == inputLength - 1) {
            newIndex = 0;
        }

        numbers.splice(currentIndex, 1);
        numbers.splice(newIndex, 0, currentNumber);

        const currentStateOfNumbers = numbers.map((number) => {
            return number.move;
        });
        numbersStrings.push(currentStateOfNumbers.join(", "));
    }

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

// console.log("Sum of three: ", day20Task1(input).sumOfThree);
module.exports = { day20Task1 };
