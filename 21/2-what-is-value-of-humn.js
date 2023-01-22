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

    // let humn = 0 (assuming that values will only ever be positive)
    let humn = 0;
    // while loop to increment humn until both expressions are equal (in a sense this is brute force, but the previous code makes it much faster)
    while (eval(monkeys[firstQuartet]) !== eval(monkeys[secondQuartet])) {
        ++humn;
    }
    // return value of humn
    return humn;
}

module.exports = { day21Task2 };
