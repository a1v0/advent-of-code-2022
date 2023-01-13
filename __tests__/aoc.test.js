const { day20Task1 } = require("../20/1-sum-three-numbers-grove-coordinates");
const { day20Task2 } = require("../20/2-sum-after-ten-rounds");
const { day21Task1 } = require("../21/1-what-number-will-root-yell");
const { day22Task1 } = require("../22/1-what-is-final-password");
const { testInput: day20Input } = require("../20/input");
const { testInput: day21Input } = require("../21/input");
const { testInput: day22Input, basicInput } = require("../22/input");

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
});

describe.only("Day 22", () => {
    describe("Task 1", () => {
        test("returns correct value with my own input data", () => {
            expect(day22Task1(basicInput)).toBe(6005);
        });
        test("returns correct value with test data", () => {
            expect(day22Task1(day22Input)).toBe(6032);
        });
    });
});
