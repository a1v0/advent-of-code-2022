const { day20Task1 } = require("../20/1-sum-three-numbers-grove-coordinates");
const { testInput: input } = require("../20/input");

describe("Day 20", () => {
    describe("Task 1", () => {
        test("should return object with property of numbersStrings, returning data according to sample input", () => {
            const numbersStrings = day20Task1(input).numbersStrings;
            expect(numbersStrings[0]).toBe("1, 2, -3, 3, -2, 0, 4");
            expect(numbersStrings[1]).toBe("2, 1, -3, 3, -2, 0, 4");
            expect(numbersStrings[2]).toBe("1, -3, 2, 3, -2, 0, 4");
            expect(numbersStrings[3]).toBe("1, 2, 3, -2, -3, 0, 4");
            expect(numbersStrings[4]).toBe("1, 2, -2, -3, 0, 3, 4");
            expect(numbersStrings[5]).toBe("1, 2, -3, 0, 3, 4, -2");
            expect(numbersStrings[6]).toBe("1, 2, -3, 0, 3, 4, -2");
            expect(numbersStrings[7]).toBe("1, 2, -3, 4, 0, 3, -2");
        });
        test("should return correct sumOfThree value", () => {
            const sumOfThree = day20Task1(input).sumOfThree;
            expect(sumOfThree).toBe(3);
        });
    });
});
