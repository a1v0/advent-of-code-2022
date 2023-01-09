const { input } = require("./input");

//
//
// solution is very slow with the real data. Presumably string.replace() isn't a fast way to do this
// I could see if this refactor would work:
// // go through the monkeys object, finding each index with a number
// // loop through until everything property has a number, then eval() the root property
//
//

function day21Task1(input) {
    // split input into array of strings
    const inputStrings = input.split("\n");

    // map strings into dictionary { "abcd": "efgh + ijkl" }
    const monkeys = {};
    inputStrings.forEach((inputString) => {
        const monkeyName = inputString.match(/^\w{4}/)[0];
        // at this point it doesn't matter that numbers are being returned as strings
        monkeys[monkeyName] = inputString.match(/(?<=:\s).*$/)[0];
    });

    // create root string, starting out as the value of root from the input
    let root = monkeys.root;

    // create a regex that finds all four-letter groups in the root string
    const letterQuartetRegex = /\w{4}/g;

    // while loop until the regex doesn't find anything anymore
    while (letterQuartetRegex.test(root)) {
        // loop through each four-letter group in the regex array
        const quartets = root.match(letterQuartetRegex);
        console.log(quartets.length);
        quartets.forEach((quartet) => {
            // replace each four-letter group with "( whatever expression corresponds to that group )"
            root = root.replace(quartet, `(${monkeys[quartet]})`);
        });
    }
    // once the string has been composed, use eval()
    return eval(root);
}
day21Task1(input);
module.exports = { day21Task1 };
