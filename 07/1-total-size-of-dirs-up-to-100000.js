const { input } = require("./input");

// Find all of the directories with a total size of at most 100000. What is the sum of the total sizes of those directories?

// remove all lines of "$ ls\n" from input, as these are a distraction
const bashListCommandRegex = /\$\sls\n/g;
const inputWithoutLs = input.replace(bashListCommandRegex, "");

const commandsStrings = inputWithoutLs.split("$ ");

const commands = commandsStrings.map((commandsString) => {
    const command = commandsString.split("\n");
    command.pop(); // gets rid of "" that comes from split()
    return command;
});
commands.shift(); // removes [""] that was left when we created commandsStrings

// create root object, representing / directory. Each directory obj has a "size" property
const root = { size: 0 };

const currentPath = [];

const allPaths = [];

commands.forEach((command) => {
    const cdCommand = command[0].split(" ")[1];
    switch (cdCommand) {
        case "/":
            currentPath.length = 0;
            break;
        case "..":
            currentPath.pop();
            break;
        default:
            currentPath.push(cdCommand);
            break;
    }
    
    const currentPathString = currentPath.reduce((path, currentElement) => {
        return path + `["${currentElement}"]`;
    }, "root");
    
    if (!allPaths.includes(currentPathString)) {
        allPaths.push(currentPathString);
    }

    const currentDirectory = eval(currentPathString);
    for (let i = 1; i < command.length; ++i) {
        const [sizeOrDir, name] = command[i].split(" ");
        if (sizeOrDir === "dir") {
            currentDirectory[name] = { size: 0 };
        } else {
            currentDirectory[name] = Number(sizeOrDir);
        }
    }
});

allPaths.sort((a, b) => {
    return b.split("[").length - a.split("[").length;
});

const allDirSizes = [];
allPaths.forEach((path) => {
    const currentDirectory = eval(path);
    for (let node in currentDirectory) {
        if (typeof currentDirectory[node] === "object") {
            currentDirectory.size += currentDirectory[node].size;
            allDirSizes.push(currentDirectory[node].size);
            continue;
        } 
        
        currentDirectory.size += currentDirectory[node];
        
    }
});

const sumOfDirsUpTo100000 = allDirSizes.reduce((accumulator, currentSize) => {
    if (currentSize <= 100000) {
        return accumulator + currentSize;
    }
    return accumulator;
}, 0);

console.log(sumOfDirsUpTo100000);
