const { testInput: input } = require("./input");

function day21Task1(input) {
    // split input into array of strings
    // map strings into dictionary { "abcd": "efgh + ijkl" }
    // create root string, starting out as the value of root from the input
    // create a regex that finds all four-letter groups in the root string
    // while loop until the regex doesn't find anything anymore
    // // loop through each four-letter group in the regex array
    // // replace each four-letter group with "( whatever expression corresponds to that group )"
    // once the string has been composed, use eval()
}
module.exports = { day21Task1 };