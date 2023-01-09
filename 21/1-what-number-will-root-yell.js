const { input } = require("./input");

function day21Task1(input) {
    // split input into array of strings
    const inputStrings = input.split("\n");

    // map strings into object
    const monkeys = {};
    inputStrings.forEach((inputString) => {
        const monkeyName = inputString.match(/^\w{4}/)[0];
        let monkeyCry = inputString.match(/(?<=:\s).*$/)[0];
        monkeys[monkeyName] = [monkeyCry, false];
    });

    // while loop until root item is a number
    const quartetRegex = /\w{4}/;
    while (!monkeys.root[1]) {
        // loop through monkeys, replacing strings as necessary
        for (let quartet in monkeys) {
            try {
                // use eval() to update object, set isNumber to true
                monkeys[quartet][0] = String(eval(monkeys[quartet][0]));
                monkeys[quartet][1] = true;

                // find quartet that uses that value and update
                for (let quartetSearch in monkeys) {
                    if (RegExp(quartet).test(monkeys[quartetSearch][0])) {
                        monkeys[quartetSearch][0] = monkeys[
                            quartetSearch
                        ][0].replace(quartet, monkeys[quartet][0]);
                        break;
                    }
                }
            } catch {}
        }
    }
    return Number(monkeys.root[0]);
}
console.log(day21Task1(input));
module.exports = { day21Task1 };
