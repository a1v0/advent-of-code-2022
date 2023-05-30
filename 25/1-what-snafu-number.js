// import input
// split input into rows
// create array of totals, [0s, 5s, 25s, 125s...]
// forEach for input rows:
// // split into individual chars
// // reverse so units first, then fives, 25s etc.
// // loop through chars
// // // switch to handle value:
// // // // handle - and =
// // // // default is Number(input)
// // // increment totals array by number

// convert totals array to correct format
// (either mutate or create a new array)
// wrap everything in a while loop to ensure it only stops once every value is between -2 and 2
// loop through totals
// if value is between -2 and 2, leave it
// if > 2, find how many times 5 goes into value
// // if 1 or more:
// // // add amount of times to next column
// // // // add error handler in case next column doesn’t yet exist
// // // add amount % 5 to current column
// // if < 1:
// // // add 1 to next column
// // // find amount – 5 and replace current column with that value
// if < -2, it’s basically as above, but we subtract from the next column, instead of adding
// // make some fresh test data to test this out using values that give negative numbers in various columns

// convert to correct format (- and =), stringify, return
