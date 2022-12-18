// how to do this in such a way that it doesn't take a lifetime to run?

// instead of adding each taken-up coordinate to set/array, add ranges of coordinates for each row
// loop through each row, with its ranges, looking for an x coordinate that's outside of any given range

// map input into objects, as in first task
// create 0-indexed array to store data for every row's data
// loop through every row (it's 4mil rows, so may be inefficient...)
// // for every row, identify the relevant sensors
// // using logic similar to Task 1, add a range to the array (ideally numbers, not strings, so [[startX, startY], [endX, endY]])
// loop through each row in the array to check if there's an x coordinate that isn't spoken for
// return x coordinate and corresponding y
// multiply x by 4000000 and add y
