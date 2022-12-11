const { testInput: input } = require("./input");

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
    monkey.operation = monkeyString.match(operationRegex)[0];

    // divisor
    const divisorRegex = /(?<=divisible by )[0-9]+(?=\n)/;
    monkey.divisor = Number(monkeyString.match(divisorRegex)[0]);

    // actions if true or false
    const trueRegex = /(?<=true: throw to monkey )[0-9]+(?=\n)/;
    const falseRegex = /(?<=false: throw to monkey )[0-9]+/;

    monkey.monkeyTrue = Number(monkeyString.match(trueRegex)[0]);
    monkey.monkeyFalse = Number(monkeyString.match(falseRegex)[0]);

    return monkey;
});

// loop through all monkeys twenty times
// loop through each monkey's items in turn, processing as necessary, doing ++objectsInspected.
for (let i = 0; i < 10000; ++i) {
    monkeys.forEach((monkey) => {
        monkey.startingItems.forEach((startingItem) => {
            const old = BigInt(startingItem);
            const operatedWorryLevel = eval(monkey.operation);
            const dividedWorryLevel = Math.floor(operatedWorryLevel / 1);
            const nextMonkey =
                dividedWorryLevel % monkey.divisor === 0
                    ? monkey.monkeyTrue
                    : monkey.monkeyFalse;
            monkeys[nextMonkey].startingItems.push(BigInt(dividedWorryLevel));
            console.log(BigInt(dividedWorryLevel));
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
