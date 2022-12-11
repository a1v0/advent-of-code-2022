// I know I've technically been a bit too liberal with my BigInt coercions

const { testInput: input } = require("./input");

// split string into different monkeys
const monkeysStrings = input.split("\n\n");

// map monkeys into monkey objects (incl. a new 'objectsInspected' property)
const monkeys = monkeysStrings.map((monkeyString) => {
    const monkey = { objectsInspected: BigInt(0) };

    // get starting items
    const startingItemsRegex = /(?<=Starting items: )[\d+,*\s]+(?=\n)/;
    const startingItemsString = monkeyString.match(startingItemsRegex)[0];
    const startingItemsStrings = startingItemsString.split(", ");
    monkey.startingItems = startingItemsStrings.map((startingItemsString) => {
        return BigInt(startingItemsString);
    });

    // operation (will take a string and evaluate it later)
    const operationRegex = /(?<=new\s\=\s)[a-z0-9\s\+\*\-\/]+(?=\n)/;
    const operation = monkeyString.match(operationRegex)[0];
    const number = operation.match(/\d+/);
    const operationWithoutNumber = operation.replace(/\d+/, "");
    const bigIntOperation = Array.isArray(number)
        ? `${operationWithoutNumber}BigInt(${number[0]})`
        : operation;
    monkey.operation = bigIntOperation;

    // divisor
    const divisorRegex = /(?<=divisible by )[0-9]+(?=\n)/;
    monkey.divisor = BigInt(monkeyString.match(divisorRegex)[0]);

    // actions if true or false
    const trueRegex = /(?<=true: throw to monkey )[0-9]+(?=\n)/;
    const falseRegex = /(?<=false: throw to monkey )[0-9]+/;

    monkey.monkeyTrue = monkeyString.match(trueRegex)[0];
    monkey.monkeyFalse = monkeyString.match(falseRegex)[0];
    return monkey;
});

// loop through all monkeys twenty times
// loop through each monkey's items in turn, processing as necessary, doing ++objectsInspected.
for (let i = 0; i < 10000; ++i) {
    monkeys.forEach((monkey) => {
        monkey.startingItems.forEach((startingItem) => {
            const old = BigInt(startingItem);
            const operatedWorryLevel = eval(monkey.operation);
            const nextMonkey =
                operatedWorryLevel % monkey.divisor === 0
                    ? monkey.monkeyTrue
                    : monkey.monkeyFalse;
            monkeys[nextMonkey].startingItems.push(BigInt(operatedWorryLevel));
            monkey.objectsInspected += BigInt(1);
            console.log(i);
        });
        monkey.startingItems.splice(0);
    });
}
// identify two monkeys with highest level of inspected objects
const objectsInspected = monkeys.map((monkey) => {
    return BigInt(monkey.objectsInspected);
});
console.log(objectsInspected);

function findHighest(array) {
    let highest = BigInt(0);
    array.forEach((number) => {
        if (BigInt(number) > highest) highest = BigInt(number);
    });
    return highest;
}

const highest = BigInt(findHighest(objectsInspected));
objectsInspected.splice(objectsInspected.indexOf(highest), 1);
const secondHighest = BigInt(findHighest(objectsInspected));

// return product of those two values
console.log(BigInt(highest) * BigInt(secondHighest));
