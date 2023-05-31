const { input } = require("./input");

function day21Task2(input) {
    const inputStrings = input.split("\n");

    const monkeys = {};
    inputStrings.forEach((inputString) => {
        const monkeyName = inputString.match(/^\w{4}/)[0];
        const monkeyCry = inputString.match(/(?<=:\s).*$/)[0];
        monkeys[monkeyName] = monkeyCry;
    });

    // set monkeys.humn to humn to prevent problems down the line
    monkeys.humn = "humn";

    // store both four-letter groups marked in root
    const [firstQuartet, secondQuartet] = monkeys.root.match(/\w{4}/g);

    let evaluationComplete = false;// this isn't an amazing while loop condition, but it's the best I could come up with
    while (
        !evaluationComplete
    ) {
        for (let quartet in monkeys) {
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

    // loop through code until we have 50 integers (should be enough to spot any pattern in test and real data)
    const humnValuePerInteger = [];
    let humn = 0; // assuming that values will only ever be positive
    while (humnValuePerInteger.length <= 50) {
        if (eval(monkeys[firstQuartet]) % 10 === 0) {
            humnValuePerInteger.push(humn);
        }
        ++humn;
    }

    // add differences in increment values to an array (final value is NaN)
    const allDifferences = humnValuePerInteger.map((humnValue, index) => {
        return humnValuePerInteger[index + 1] - humnValue;
    });

    let lengthOfPattern;
    for (let i = 1; i < allDifferences.length; ++i) {
        for (let j = 0; j < allDifferences.length; ++j) {
            if (isNaN(allDifferences[j + i])) {
                // if you make it to the end of the array without any test returning false, you know the size of the pattern
                lengthOfPattern = i;
                break;
            }
            if (allDifferences[j] !== allDifferences[j + i]) break;
        }
        if (lengthOfPattern) break;
    }

    const pattern = allDifferences.splice(0, lengthOfPattern);
    const sumOfPatternIntervals = pattern.reduce(
        (accumulator, currentValue) => {
            return accumulator + currentValue;
        },
        0
    );

    // reset humn to value that produces first integer
    humn = humnValuePerInteger[0];

    // while loop, incrementing humn by amount specified in pattern
    const secondValueInRoot = eval(monkeys[secondQuartet]); // 28379346560301 with real input

    const firstQuartetEquation = simplify(monkeys[firstQuartet]);

    // create expression to check if we overshoot our goal
    const alvoQuartetEquation = firstQuartetEquation.replace("humn", "alvo");

    const comparisonOvershoot =
        eval(firstQuartetEquation) > secondValueInRoot
            ? "eval(alvoQuartetEquation) < secondValueInRoot"
            : "eval(alvoQuartetEquation) > secondValueInRoot";

    // reduce the numbers quickly
    for (let order = 3; order >= 0; --order) {
        while (true) {
            const alvo = humn + Math.pow(sumOfPatternIntervals, order);
            if (!eval(comparisonOvershoot)) {
                humn = alvo;
            } else {
                break;
            }
        }
    }

    return humn;

    // to reduce the effort required by the eval function in the while loop
    // this function might be redundant, now that the code runs very quickly
    function simplify(equation) {
        const simplifyRegex = /\([\d\s\+\-\*\/]+\)/g;
        while (simplifyRegex.test(equation)) {
            const subEquations = equation.match(simplifyRegex);
            subEquations.forEach((subEquation) => {
                equation = equation.replace(
                    subEquation,
                    String(eval(subEquation))
                );
            });
        }

        const humnRegex = /\(humn\)/g;
        while (humnRegex.test(equation)) {
            equation = equation.replace("(humn)", "humn");
        }
        return equation;
    }
}
// console.log(day21Task2(input)); // 3221245824363

module.exports = { day21Task2 };
