const { input } = require("./input");

function day21Task2(input) {
    // split input into array of strings
    const inputStrings = input.split("\n");

    // map strings into object
    const monkeys = {};
    inputStrings.forEach((inputString) => {
        const monkeyName = inputString.match(/^\w{4}/)[0];
        let monkeyCry = inputString.match(/(?<=:\s).*$/)[0];
        // monkeys[monkeyName] = [monkeyCry, false];
        monkeys[monkeyName] = monkeyCry;
    });

    // set monkeys.humn to humn to prevent problems down the line
    monkeys.humn = "humn";

    // store both four-letter groups marked in root
    const [firstQuartet, secondQuartet] = monkeys.root.match(/\w{4}/g);

    // evaluate everything except the value of humn
    const quartetRegex = /\w{4}/;
    while (
        RegExp(firstQuartet).test(monkeys.root) &&
        RegExp(secondQuartet).test(monkeys.root)
        // this condition isn't robust enough to stop the loop at the right point
        //
        // it doesn't seem like there are any quartets that are anagrams of humn, so it may be possible to make a regex that'll ignore anything that's not m, u, n or h
        //
        //
        //
        //
        //
        //
        //
        //
        //
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
                        monkeys[quartet]
                    );
                    break;
                }
            }
        }
    }

    // this should yield two expressions, each containing humn as an unknown value
    console.log(monkeys);
    // let humn = 0 (assuming that values will only ever be positive)
    // while loop to increment humn until both expressions are equal (in a sense this is brute force, but the previous code makes it much faster)
    // return value of humn
}

module.exports = { day21Task2 };
