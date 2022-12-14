// This solution works for 1000 cycles, but always falters at 1070, presumably because the BigInt exceeds 1bn bits.
// I will need to work out how to circumvent this issue to retrieve a result

const { input } = require("./input");

// split string into different monkeys
const monkeysStrings = input.split("\n\n");

// map monkeys into monkey objects (incl. a new 'objectsInspected' property)
const monkeys = monkeysStrings.map((monkeyString) => {
    const monkey = { objectsInspected: 0 };

    // get starting items
    const startingItemsRegex = /(?<=Starting items: )[\d+,*\s]+(?=\n)/;
    const startingItemsString = monkeyString.match(startingItemsRegex)[0];
    const startingItemsStrings = startingItemsString.split(", ");
    monkey.startingItems = startingItemsStrings.map((startingItemsString) => {
        return Number(startingItemsString);
    });

    // operation (will take a string and evaluate it later)
    const operationRegex = /(?<=new\s\=\s)[a-z0-9\s\+\*\-\/]+(?=\n)/;
    const operation = monkeyString.match(operationRegex)[0];
    monkey.operation = operation;

    // divisor
    const divisorRegex = /(?<=divisible by )[0-9]+(?=\n)/;
    monkey.divisor = monkeyString.match(divisorRegex)[0];

    // actions if true or false
    const trueRegex = /(?<=true: throw to monkey )[0-9]+(?=\n)/;
    const falseRegex = /(?<=false: throw to monkey )[0-9]+/;

    monkey.monkeyTrue = Number(monkeyString.match(trueRegex)[0]);
    monkey.monkeyFalse = Number(monkeyString.match(falseRegex)[0]);

    return monkey;
});

const specialDivisor = monkeys.reduce((acc, monkey) => {
    return acc * monkey.divisor;
}, 1);

// loop through each monkey's items in turn, processing as necessary, doing ++objectsInspected.
for (let i = 0; i < 10000; ++i) {
    monkeys.forEach((monkey) => {
        monkey.startingItems.forEach((startingItem) => {
            const old = startingItem;
            const operatedWorryLevel = eval(monkey.operation) % specialDivisor; // tbh not sure why this line works
            const nextMonkey = !(operatedWorryLevel % monkey.divisor)
                ? monkey.monkeyTrue
                : monkey.monkeyFalse;
            monkeys[nextMonkey].startingItems.push(operatedWorryLevel);
            ++monkey.objectsInspected;
        });
        monkey.startingItems.length = 0;
    });
}

// identify two monkeys with highest level of inspected objects
const objectsInspected = monkeys.map((monkey) => {
    return monkey.objectsInspected;
});

const highest = Math.max(...objectsInspected);
objectsInspected.splice(objectsInspected.indexOf(highest), 1);
const secondHighest = Math.max(...objectsInspected);

// return product of those two values
console.log(highest * secondHighest);
