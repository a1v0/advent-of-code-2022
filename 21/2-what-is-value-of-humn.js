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

    // given the size of the real input, brute-forcing the value of humn by incrementing by 1 each time is too inefficient
    // however, there is a repeating: after x increments, the result is an int. Then, after further y increments, it is also an int, etc.
    // I need to programmatically identify the pattern (according to Excel, it's something like 150, 150, 3000, 150, 150, 3500), then increment humn by the value dictated by the pattern

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

    // nested for loop: i = length of pattern (this loop isn't the cleanest of things I've ever written...)
    let lengthOfPattern;
    for (let i = 1; i < allDifferences.length; ++i) {
        for (let j = 0; j < allDifferences.length; ++j) {
            // check array[0] === array[i]
            // check array[1] === array[i+1]...
            if (isNaN(allDifferences[j + i])) {
                // if you make it to the end of the array without any test returning false, you know the size of the pattern
                lengthOfPattern = i;
                break;
            }
            if (allDifferences[j] !== allDifferences[j + i]) break;
        }
        if (lengthOfPattern) break;
    }

    // splice to create an array containing the intervals
    const pattern = allDifferences.splice(0, lengthOfPattern);
    const sumOfPatternIntervals = pattern.reduce(
        (accumulator, currentValue) => {
            return accumulator + currentValue;
        },
        0
    );
    const squareOfPatternIntervals = Math.pow(sumOfPatternIntervals, 2);

    // reset humn to value that produces first integer
    humn = humnValuePerInteger[0];

    // while loop, incrementing humn by amount specified in pattern
    let patternIndex = 2;
    const secondValueInRoot = eval(monkeys[secondQuartet]); // 28379346560301 with real input
    //                                                         28379346590140
    //                                                         28379346559509

    const firstQuartetEquation = simplify(monkeys[firstQuartet]);

    // create expression to check if we overshoot our goal
    const alvoQuartetEquation = firstQuartetEquation.replace("humn", "alvo");

    const comparisonOvershoot =
        eval(firstQuartetEquation) > secondValueInRoot
            ? "eval(alvoQuartetEquation) < secondValueInRoot"
            : "eval(alvoQuartetEquation) > secondValueInRoot";
    // instead, do a countdown within a while loop
    // for( 3; >0; --)
    // while(... > secondValue...)
    // add cube of pattern
    // then square
    // then sum
    //
    // by this point, we should be pretty close to the correct value, so from here we can just increment humn by 1
    //
    //
    //
    //
    //
    //
    //
    //
    //
    while (
        // somehow these are occasionally being evaluated with .01 or .99 on the end
        Math.round(eval(firstQuartetEquation)) !== secondValueInRoot &&
        eval(firstQuartetEquation) >= secondValueInRoot
    ) {
        const alvo = humn + squareOfPatternIntervals;
        if (!eval(comparisonOvershoot)) {
            humn = alvo;
        } else {
            humn += pattern[patternIndex % lengthOfPattern];
            ++patternIndex;
            console.log(
                eval(firstQuartetEquation),
                Math.round(eval(firstQuartetEquation))
            );
        }
    }
    return humn;

    // to reduce the effort required by the eval function in the while loop
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
console.log(day21Task2(input));

module.exports = { day21Task2 };

// alternative solution (though this might not work well with the test data):
// do humn *= 2 until the value of the expression overshoots the desired result
// undo the final *= 2 so that the expression is still on the right side of the desire result
// repeat, but instead of multiplying, increment humn by a large number (e.g. 10000), until you overshoot
// undo the final += 10000, then increment by 1 until you solve it
// it's crude and not necessarily super scalable to an even bigger input
