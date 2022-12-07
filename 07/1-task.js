const { input } = require("./input");

// Find all of the directories with a total size of at most 100000. What is the sum of the total sizes of those directories?

// remove all lines of "$ ls\n" from input, as these are a distraction
const inputWithoutLs = input.replace(/\$\sls\n/g, "");

// split input by $
const commandsStrings = inputWithoutLs.split("$ ");

// create array of nested commands
const commands = commandsStrings.map((commandsString) => {
    const command = commandsString.split("\n");
    command.pop(); // gets rid of "" that comes from split()
    return command;
});
commands.shift(); // removes [""] that was left when we created commandsStrings

// create root object, representing / directory. Each directory obj has a "size" property
const root = { size: 0, parentName: "root" };

// create array containing elements of the current path (which can be spliced as necessary)
const currentPath = [];

// create array of all paths and input each path into it as you go along (input as string to make it easy to check if a path has already been entered)
const allPaths = [];

// loop through input, inputting dirs and files into tree
commands.forEach((command) => {
    const cdCommand = command[0].split(" ")[1];
    switch (cdCommand) {
        case "/":
            currentPath.pop();
            break;
        case "..":
            currentPath.pop();
            break;
        default:
            currentPath.push(cdCommand);
            break;
    }
    console.log(cdCommand, currentPath, "command / path");
    const currentPathString = currentPath.join(" ");
    if (!allPaths.includes(currentPathString)) {
        allPaths.push(currentPathString);
    }

    const currentDirectory = accessPath(root, currentPath);
    console.log(currentDirectory, "currDir");
    console.log("----------------");

    for (let i = 1; i < command.length; ++i) {
        const [sizeOrDir, name] = command[i].split(" ");
        if (sizeOrDir === "dir") {
            currentDirectory[name] = { size: 0, parentName: name };
            // } else {
            //     currentDirectory[name] = Number(sizeOrDir);
            //     currentDirectory.size += Number(sizeOrDir);
        }
    }
});

function accessPath(currentPathObject, remainderOfPath) {
    if (!remainderOfPath.length) {
        console.log(currentPathObject.parentName, "cPO.pN");
        return currentPathObject;
    }

    const newPathObject = currentPathObject[remainderOfPath.shift()];
    console.log(newPathObject.parentName, "newPath.pN");
    accessPath(newPathObject, remainderOfPath);
}

// loop through tree, counting total folder sizes (how do I do this from the deepest folder(s) up?). Probably needs recursion
