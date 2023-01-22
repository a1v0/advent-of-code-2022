const { input } = require("./input");

function day21Task2(input) {
    // split input into array of strings
    const inputStrings = input.split("\n");

    // map strings into object
    const monkeys = {};
    inputStrings.forEach((inputString) => {
        const monkeyName = inputString.match(/^\w{4}/)[0];
        const monkeyCry = inputString.match(/(?<=:\s).*$/)[0];
        // monkeys[monkeyName] = [monkeyCry, false];
        monkeys[monkeyName] = monkeyCry;
    });

    // set monkeys.humn to humn to prevent problems down the line
    monkeys.humn = "humn";

    // store both four-letter groups marked in root
    const [firstQuartet, secondQuartet] = monkeys.root.match(/\w{4}/g);

    // evaluate everything except the value of humn
    const quartetRegex = /\w{4}/;
    let evaluationComplete = false;
    while (
        // I know this is not an ideal solution, but, after endless experimenting, I couldn't find another solution that would work
        !evaluationComplete
    ) {
        //
        // at some point in this loop we'll need to surround stuff in parentheses to ensure they get evaluated in the correct order
        //
        //
        //
        for (let quartet in monkeys) {
            // find quartet that uses that value and update
            for (let quartetSearch in monkeys) {
                if (RegExp(quartet).test(monkeys[quartetSearch])) {
                    monkeys[quartetSearch] = monkeys[quartetSearch].replace(
                        quartet,
                        `(${monkeys[quartet]})`
                    );
                }
            }
        }
        if (
            monkeys.root.match(/(humn)/g) &&
            monkeys.root.match(/(humn)/g).length ===
                monkeys.root.match(/[a-z]{4}/g).length
        ) {
            evaluationComplete = true;
        }
    }
    return;
    // given the size of the real input, brute-forcing the value of humn by incrementing by 1 is too inefficient
    // however, there is a repeating: after x increments, the result is an int. Then, after further y increments, it is also an int, etc.
    // I need to programmatically identify the pattern (according to Excel, it's something like 150, 150, 3000, 150, 150, 3500), then increment humn by the value dictated by the pattern
    // loop through code until we have 50 integers (should be enough to spot any pattern in test and real data)
    // add differences in increment values to an array
    // nested for loop: i = length of pattern
    // check array[0] === array[i]
    // check array[1] === array[i+1]...
    // if you make it to the end of the array without any test returning false, you know the size of the pattern
    // splice to create an array containing the intervals
    // while loop, incrementing humn by amount specified in pattern
    // by my calculations, the time to complete the while loop should be 15–20 minutes
    //
    //
    //
    //
    //
    //
    //
    //

    // let humn = 0 (assuming that values will only ever be positive)
    let humn = 0;
    // while loop to increment humn until both expressions are equal (in a sense this is brute force, but the previous code makes it much faster)
    const secondValueInRoot = eval(monkeys[secondQuartet]); // 28379346560301 with real input
    console.log((59078404545070 - 28379346560301) / 9.5); // 3231479787870
    while (eval(monkeys[firstQuartet]) !== secondValueInRoot) {
        // if (eval(monkeys[firstQuartet]) % 10 === 0) {
        //     console.log(humn);
        // }
        // console.log(eval(monkeys[firstQuartet]));
        // doing a simple ++ is far too inefficient with the real data
        // increment/decrement by a larger number (or do something like humn *= 2) each time
        // // create an exponent that's either 1 or -1 depending on whether the target value is higher or lower
        ++humn;
    }
    // return value of humn
    return humn;
}
// console.log(day21Task2(input));

module.exports = { day21Task2 };

// alternative solution (though this might not work well with the test data):
// do humn *= 2 until the value of the expression overshoots the desired result
// undo the final *= 2 so that the expression is still on the right side of the desire result
// repeat, but instead of multiplying, increment humn by a large number (e.g. 10000), until you overshoot
// undo the final += 10000, then increment by 1 until you solve it
// it's crude and not necessarily super scalable to an even bigger input
