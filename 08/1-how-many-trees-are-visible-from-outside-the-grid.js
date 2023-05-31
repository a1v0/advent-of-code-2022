const { input } = require("./input.js");

const rowsOfTrees = input.split("\n");

const allTrees = rowsOfTrees.map((rowOfTrees) => {
    return rowOfTrees.split("").map((tree) => {
        return { height: Number(tree), visible: false };
    });
});

// loop through rows ltr, rtl, then cols ttb and btt
allTrees.forEach((treeRow) => {
    for (let i = 0; i < 2; i++) {
        let tallestTree = -1;
        treeRow.reverse();

        treeRow.forEach((tree) => {
            if (tree.height > tallestTree) {
                tallestTree = tree.height;
                tree.visible = true;
            }
        });
    }
});

for (let i = 0; i < allTrees[0].length; ++i) {
    let tallestTree = -1;
    for (let j = 0; j < allTrees.length; ++j) {
        if (allTrees[j][i].height > tallestTree) {
            tallestTree = allTrees[j][i].height;
            allTrees[j][i].visible = true;
        }
    }
    
    tallestTree = -1;
    for (let j = allTrees.length - 1; j >= 0; --j) {
        if (allTrees[j][i].height > tallestTree) {
            tallestTree = allTrees[j][i].height;
            allTrees[j][i].visible = true;
        }
    }
}

const totalVisible = allTrees.reduce((totalVisibleInForest, currentRow) => {
    const totalInRow = currentRow.reduce((totalVisibleInRow, currentTree) => {
        if (currentTree.visible) {
            return totalVisibleInRow + 1;
        }
        
        return totalVisibleInRow;
    }, 0);
    
    return totalVisibleInForest + totalInRow;
}, 0);

console.log(totalVisible);

module.exports = allTrees;
