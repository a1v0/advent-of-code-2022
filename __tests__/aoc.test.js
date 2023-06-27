const { day16Task1 } = require("../16/1-what-is-the-most-pressure");
const { testDistancesBetweenAllValves } = require("../16/shortest-distances");
const { testInput: day16Input } = require("../16/input");

const { day18Task2 } = require("../18/2-exterior-surface-area");
const {
    testInput: day18Input,
    simpleInput: day18SimpleInput
} = require("../18/input");

const { day20Task1 } = require("../20/1-sum-three-numbers-grove-coordinates");
const { day20Task2 } = require("../20/2-sum-after-ten-rounds");
const { testInput: day20Input } = require("../20/input");

const { day21Task1 } = require("../21/1-what-number-will-root-yell");
const { day21Task2 } = require("../21/2-what-is-value-of-humn");
const { testInput: day21Input } = require("../21/input");

const { day22Task1 } = require("../22/1-what-is-final-password");
const { day22Task2 } = require("../22/2-final-password-when-shape-is-cube");
const { testInput: day22Input, basicInput } = require("../22/input");

const { day23Task1 } = require("../23/1-how-many-empty-ground-tiles");
const { testInput: day23Input } = require("../23/input");

const { day24Task1 } = require("../24/1-fewest-minutes-to-avoid-blizzards");
const { testInput: day24Input } = require("../24/input");

describe.only("Day 16", () => {
    test("Task 1", () => {
        expect(day16Task1(day16Input, testDistancesBetweenAllValves)).toBe(
            1651
        );
    });
});

describe("Day 18", () => {
    describe("Task 2", () => {
        test("should return correct value with my own data", () => {
            expect(day18Task2(day18SimpleInput)).toBe(102);
        });
        test("should return correct value with test data", () => {
            expect(day18Task2(day18Input)).toBe(58);
        });
    });
});

describe("Day 20", () => {
    describe("Task 1", () => {
        test("should return object with property of numbersStrings, returning data according to sample input", () => {
            const numbersStrings = day20Task1(day20Input).numbersStrings;
            expect(numbersStrings[0]).toBe("1, 2, -3, 3, -2, 0, 4");
            expect(numbersStrings[1]).toBe("2, 1, -3, 3, -2, 0, 4");
            expect(numbersStrings[2]).toBe("1, -3, 2, 3, -2, 0, 4");
            expect(numbersStrings[3]).toBe("1, 2, 3, -2, -3, 0, 4");
            expect(numbersStrings[4]).toBe("1, 2, -2, -3, 0, 3, 4");
            expect(numbersStrings[5]).toBe("1, 2, -3, 0, 3, 4, -2");
            expect(numbersStrings[6]).toBe("1, 2, -3, 0, 3, 4, -2");
            expect(numbersStrings[7]).toBe("1, 2, -3, 4, 0, 3, -2");
        });
        test("should return the correct 1000th, 2000th and 3000th values", () => {
            const { oneThou, twoThou, threeThou } = day20Task1(day20Input);
            expect(oneThou).toBe(4);
            expect(twoThou).toBe(-3);
            expect(threeThou).toBe(2);
        });
        test("should return correct sumOfThree value", () => {
            const sumOfThree = day20Task1(day20Input).sumOfThree;
            expect(sumOfThree).toBe(3);
        });
    });
    describe("Task 2", () => {
        test("should return object with correct values after each round of mixing", () => {
            const numbersStrings = day20Task2(day20Input).numbersStrings;
            expect(numbersStrings[0]).toBe(
                "811589153, 1623178306, -2434767459, 2434767459, -1623178306, 0, 3246356612"
            );
            expect(numbersStrings[1]).toBe(
                "0, -2434767459, 3246356612, -1623178306, 2434767459, 1623178306, 811589153"
            );
            expect(numbersStrings[2]).toBe(
                "0, 2434767459, 1623178306, 3246356612, -2434767459, -1623178306, 811589153"
            );
            expect(numbersStrings[3]).toBe(
                "0, 811589153, 2434767459, 3246356612, 1623178306, -1623178306, -2434767459"
            );
            expect(numbersStrings[4]).toBe(
                "0, 1623178306, -2434767459, 811589153, 2434767459, 3246356612, -1623178306"
            );
            expect(numbersStrings[5]).toBe(
                "0, 811589153, -1623178306, 1623178306, -2434767459, 3246356612, 2434767459"
            );
            expect(numbersStrings[6]).toBe(
                "0, 811589153, -1623178306, 3246356612, -2434767459, 1623178306, 2434767459"
            );
            expect(numbersStrings[7]).toBe(
                "0, -2434767459, 2434767459, 1623178306, -1623178306, 811589153, 3246356612"
            );
            expect(numbersStrings[8]).toBe(
                "0, 1623178306, 3246356612, 811589153, -2434767459, 2434767459, -1623178306"
            );
            expect(numbersStrings[9]).toBe(
                "0, 811589153, 1623178306, -2434767459, 3246356612, 2434767459, -1623178306"
            );
            expect(numbersStrings[10]).toBe(
                "0, -2434767459, 1623178306, 3246356612, -1623178306, 2434767459, 811589153"
            );
        });
        test("should return the correct 1000th, 2000th and 3000th values", () => {
            const { oneThou, twoThou, threeThou } = day20Task2(day20Input);
            expect(oneThou).toBe(811589153);
            expect(twoThou).toBe(2434767459);
            expect(threeThou).toBe(-1623178306);
        });
        test("should return correct sumOfThree value", () => {
            const sumOfThree = day20Task2(day20Input).sumOfThree;
            expect(sumOfThree).toBe(1623178306);
        });
    });
});

describe("Day 21", () => {
    describe("Task 1", () => {
        test("returns correct value", () => {
            expect(day21Task1(day21Input)).toBe(152);
        });
    });
    describe("Task 2", () => {
        test("returns correct value", () => {
            expect(day21Task2(day21Input)).toBe(301);
        });
    });
});

describe("Day 22", () => {
    describe("Task 1", () => {
        test("returns correct value with my own input data", () => {
            expect(day22Task1(basicInput)).toBe(6005);
        });
        test("returns correct value with test data", () => {
            expect(day22Task1(day22Input)).toBe(6032);
        });
    });
    describe("Task 2", () => {
        test("returns correct value with test data", () => {
            expect(day22Task2(day22Input)).toBe(5031);
        });
    });
});

describe("Day 23", () => {
    describe("Task 1", () => {
        test("returns correct value with test data", () => {
            expect(day23Task1(day23Input)).toBe(110);
        });
    });
});

describe("Day 24", () => {
    describe("Task 1", () => {
        test("returns correct value with test data", () => {
            expect(day24Task1(day24Input)).toBe(18);
        });
    });
});
