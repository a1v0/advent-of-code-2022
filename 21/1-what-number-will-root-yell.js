const { input } = require("./input");

function day21Task1(input) {
    const inputStrings = input.split("\n");

    const monkeys = {};
    inputStrings.forEach((inputString) => {
        const monkeyName = inputString.match(/^\w{4}/)[0];
        let monkeyCry = inputString.match(/(?<=:\s).*$/)[0];
        monkeys[monkeyName] = [monkeyCry, false];
    });

    const quartetRegex = /\w{4}/;
    while (!monkeys.root[1]) {
        for (let quartet in monkeys) {
            try {
                monkeys[quartet][0] = String(eval(monkeys[quartet][0]));
                monkeys[quartet][1] = true;

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

// console.log(day21Task1(input));
module.exports = { day21Task1 };
