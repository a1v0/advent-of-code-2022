const allRows = require("./1-how-many-trees-are-visible-from-outside-the-grid.js");

const allColumns = [];
for (let i = 0; i < allRows[0].length; ++i) {
    const newColumn = [];
    for (let j = 0; j < allRows.length; ++j) {
        delete allRows[j][i].visible;
        newColumn.push(allRows[j][i]);
    }
    allColumns.push(newColumn);
}

calculateLineOfSight(allRows, "h"); // horizontal
calculateLineOfSight(allColumns, "v"); // vertical

// loop through each tree, calculate scenic score, and find highest
let highestScenicScore = 0;
allRows.forEach((treeRow) => {
    treeRow.forEach((tree) => {
        const scenicScore = tree.h0 * tree.h1 * tree.v0 * tree.v1;
        highestScenicScore =
            scenicScore > highestScenicScore ? scenicScore : highestScenicScore;
    });
});

console.log(highestScenicScore);

// go in all four directions and count line of sight, appending it as a property
function calculateLineOfSight(treeGroups, property) {
    treeGroups.forEach((treeGroup) => {
        for (let j = 0; j < 2; j++) {
            treeGroup.reverse();
            treeGroup.forEach((tree, index) => {
                let lineOfSight = 0;
                for (let i = index + 1; i < treeGroup.length; ++i) {
                    if (treeGroup[i].height < tree.height) {
                        ++lineOfSight;
                    } else {
                        ++lineOfSight;
                        break;
                    }
                }
                tree[property + j] = lineOfSight;
            });
        }
    });
}
