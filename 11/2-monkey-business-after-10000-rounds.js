// This solution works for 1000 cycles, but always falters at 1070, presumably because the BigInt exceeds 1bn bits.
// I will need to work out how to circumvent this issue to retrieve a result

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
    monkey.divisor = monkeyString.match(divisorRegex)[0];

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
            const old = startingItem;
            const operatedWorryLevel =
                eval(monkey.operation) % BigInt(23 * 19 * 13 * 17);
            const nextMonkey = !(operatedWorryLevel % BigInt(monkey.divisor))
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
