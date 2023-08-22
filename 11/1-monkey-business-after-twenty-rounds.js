const { input } = require("./input");

const monkeysStrings = input.split("\n\n");

const monkeys = monkeysStrings.map(createMonkey);

const loopAmount = 20;

for (let i = 0; i < loopAmount; ++i) {
    monkeys.forEach((monkey) => {
        monkey.startingItems.forEach((startingItem) => {
            const old = startingItem;
            const operatedWorryLevel = eval(monkey.operation);
            const dividedWorryLevel = Math.floor(operatedWorryLevel / 3);
            const nextMonkey =
                dividedWorryLevel % monkey.divisor === 0
                    ? monkey.monkeyTrue
                    : monkey.monkeyFalse;
            monkeys[nextMonkey].startingItems.push(dividedWorryLevel);
            ++monkey.objectsInspected;
        });
        monkey.startingItems.length = 0;
    });
}

const objectsInspected = monkeys.map((monkey) => {
    return monkey.objectsInspected;
});

const highest = Math.max(...objectsInspected);
objectsInspected.splice(objectsInspected.indexOf(highest), 1);
const secondHighest = Math.max(...objectsInspected);

const highestTimesSecondHighest = highest * secondHighest;
console.log(highestTimesSecondHighest);

const createMonkey = (monkeyString) => {
    const monkey = { objectsInspected: 0 };

    const startingItemsRegex = /(?<=Starting items: )[\d+,*\s]+(?=\n)/;
    const startingItemsString = monkeyString.match(startingItemsRegex)[0];
    const startingItemsStrings = startingItemsString.split(", ");
    monkey.startingItems = startingItemsStrings.map((startingItemsString) => {
        return Number(startingItemsString);
    });

    const operationRegex = /(?<=new\s\=\s)[a-z0-9\s\+\*\-\/]+(?=\n)/;
    monkey.operation = monkeyString.match(operationRegex)[0];

    const divisorRegex = /(?<=divisible by )[0-9]+(?=\n)/;
    monkey.divisor = Number(monkeyString.match(divisorRegex)[0]);

    const trueRegex = /(?<=true: throw to monkey )[0-9]+(?=\n)/;
    const falseRegex = /(?<=false: throw to monkey )[0-9]+/;

    monkey.monkeyTrue = Number(monkeyString.match(trueRegex)[0]);
    monkey.monkeyFalse = Number(monkeyString.match(falseRegex)[0]);

    return monkey;
};
